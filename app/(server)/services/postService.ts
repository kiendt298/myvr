"use server";

import { dbConnect } from "../database/db-connection";
import escapeStringRegexp from "escape-string-regexp";
import Post, { IPost } from "../database/models/Post";
import { Types } from "mongoose";
import { getLatestSimplifiedId } from "@/app/(common)/_helpers/action";
import { POST_STATUSES } from "@/app/(common)/_utils/constant";

export async function getPostsBySearchParams({
  pagination,
  sorting,
  filtering,
  briefServiceTitle,
  status,
}: {
  pagination: Record<string, any>;
  sorting: Record<string, any>;
  filtering: string;
  [key: string]: any;
}) {
  await dbConnect();

  const { limit, skip } = pagination;
  const { field, order } = sorting;
  const regex = escapeStringRegexp(filtering);
  const query = filtering
    ? {
        $or: [
          { title: { $regex: regex } },
          { simplified_id: { $regex: regex } },
        ],
      }
    : {};
  const briefServiceQuery = briefServiceTitle
    ? {
        package_id: {
          $regex: escapeStringRegexp(briefServiceTitle),
        },
      }
    : {};
  const statusQuery = status
    ? {
        status: {
          $regex: escapeStringRegexp(status),
        },
      }
    : {};

  const aggregateResults = await Post.aggregate([
    {
      $match: {
        ...query,
        ...briefServiceQuery,
        ...statusQuery,
      },
    },
    {
      $facet: {
        result: [
          {
            $sort: {
              [field]: order === "ASC" ? 1 : -1,
              simplified_id: -1,
            },
          },
          { $skip: skip },
          { $limit: limit },
          {
            $project: {
              _id: 0,
              id: { $toString: "$_id" },
              simplified_id: 1,
              title: 1,
              title_url: 1,
              package_id: 1,
              content: 1,
              thumbnail: 1,
              status: 1,
              views: 1,
              likes: 1,
              date: 1,
            },
          },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
    {
      $project: {
        result: 1,
        totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
      },
    },
  ]);

  if (!aggregateResults || !aggregateResults[0]) throw new Error();

  const { result, totalCount } = aggregateResults[0];
  return {
    data: result,
    count: totalCount,
  };
}

export async function getPublicPostsBySearchParams({
  pagination,
  briefServiceId,
}: {
  pagination: Record<string, any>;
  briefServiceId: string | undefined;
}) {
  await dbConnect();

  const { limit, skip } = pagination;
  const briefServiceQuery = briefServiceId
    ? {
        package_id: {
          $regex: escapeStringRegexp(briefServiceId),
        },
        status: escapeStringRegexp(POST_STATUSES.PUBLIC),
      }
    : {};

  const aggregateResults = await Post.aggregate([
    {
      $match: {
        ...briefServiceQuery,
      },
    },
    {
      $facet: {
        result: [
          { $skip: skip },
          { $limit: limit },
          {
            $sort: {
              date: -1,
            },
          },
          {
            $project: {
              _id: 0,
              simplified_id: 1,
              title: 1,
              title_url: 1,
              package_id: 1,
              content: 1,
              thumbnail: 1,
              status: 1,
              views: 1,
              likes: 1,
              date: 1,
            },
          },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
    {
      $project: {
        result: 1,
        totalCount: { $arrayElemAt: ["$totalCount.count", 0] },
      },
    },
  ]);

  if (!aggregateResults || !aggregateResults[0]) throw new Error();

  const { result, totalCount } = aggregateResults[0];
  return {
    data: result,
    count: totalCount,
  };
}

export async function createPost(body: IPost) {
  await dbConnect();

  const latestPostSimplifiedId = await getLatestSimplifiedId({ model: Post });
  const newPost = new Post({
    ...body,
    simplified_id: latestPostSimplifiedId + 1,
  });
  const result = await newPost.save();
  return result?.toObject() as IPost;
}

export async function updatePost(body: IPost) {
  await dbConnect();

  if (!body?.id) throw new Error("Không thể tìm thấy bài đăng");

  const result = await Post.findOneAndUpdate(
    { _id: new Types.ObjectId(body.id) },
    body,
    {
      new: true,
    },
  );
  return result?.toObject() as IPost;
}

export async function getPostDetailById(id: string) {
  await dbConnect();

  const postDetail = await Post.findOne({ _id: id });
  return postDetail.toObject() as IPost;
}

export async function getPostDetailBySimplifiedId(simplifiedId: number) {
  await dbConnect();

  const postDetail = await Post.findOne({ simplified_id: simplifiedId });
  return postDetail.toObject() as IPost;
}

export async function removePostById(id: string) {
  await dbConnect();

  const doc = await Post.findOneAndDelete({
    _id: new Types.ObjectId(id),
  });
  if (!doc) throw new Error("Không thể xóa bài đăng");
}

export async function getRelativePostsByServiceId(
  serviceId: string,
  excludeId?: string,
) {
  await dbConnect();
  const excludeQuery = excludeId
    ? { _id: excludeId ? { $ne: new Types.ObjectId(excludeId) } : {} }
    : {};

  const docs = await Post.find({
    package_id: serviceId,
    status: escapeStringRegexp(POST_STATUSES.PUBLIC),
    ...excludeQuery,
  }).limit(5);
  return docs.map((item) => item.toObject()) as IPost[];
}

export async function viewPost(id: string) {
  await dbConnect();

  return await Post.findOneAndUpdate(
    { _id: new Types.ObjectId(id) },
    { $inc: { views: 1 } },
  );
}
