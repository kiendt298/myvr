"use server";

import { dbConnect } from "../database/db-connection";
import escapeStringRegexp from "escape-string-regexp";
import User, { IUser } from "../database/models/User";
import { Types } from "mongoose";
import { getLatestSimplifiedId } from "@/app/(common)/_helpers/action";
import { createPremiumInfo, removePremiumInfoById } from "./premiumService";
import PremiumInfo from "../database/models/PremiumInfo";
import Quotation from "../database/models/Quotation";
import { cache } from "react";
import VRtubeVideo, { IVRtubeVideo } from "../database/models/VRtubeVideo";
import { getCloudFrontSignedURl } from "@/app/(common)/_helpers/transform";

export async function getUsersBySearchParams({
  pagination,
  sorting,
  filtering,
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
          { user_name: { $regex: regex } },
          { user_phone: { $regex: regex } },
          { user_email: { $regex: regex } },
          { address: { $regex: regex } },
          { simplified_id: { $regex: regex } },
        ],
      }
    : {};
  const statusQuery = status ? { status: escapeStringRegexp(status) } : {};

  const aggregateResults = await User.aggregate([
    {
      $match: {
        ...query,
        ...statusQuery,
      },
    },
    {
      $lookup: {
        from: "MyVRQuotation",
        localField: "quotations",
        foreignField: "_id",
        as: "quotations",
      },
    },
    {
      $lookup: {
        from: "MyVRPremiumInfo",
        localField: "premium_info",
        foreignField: "_id",
        as: "premium_info",
      },
    },
    {
      $unwind: {
        path: "$premium_info",
        preserveNullAndEmptyArrays: true,
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
              user_name: 1,
              user_email: 1,
              user_phone: 1,
              role: 1,
              address: 1,
              quotations: {
                $map: {
                  input: "$quotations",
                  as: "quotation",
                  in: {
                    id: { $toString: "$$quotation._id" },
                    simplified_id: "$$quotation.simplified_id",
                    title: "$$quotation.title",
                  },
                },
              },
              premium_info: {
                id: { $toString: "$premium_info._id" },
                is_vip: "$premium_info.is_vip",
                expired_date: "$premium_info.expired_date",
                priority_level: "$premium_info.priority_level",
              },
              status: 1,
              created_at: 1,
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

export async function createUser(body: IUser) {
  await dbConnect();

  const premiumInfo = await createPremiumInfo(body.premium_info);

  const latestUserSimplifiedId = await getLatestSimplifiedId({ model: User });
  const newUser = new User({
    ...body,
    password_changed_count: 0,
    simplified_id: latestUserSimplifiedId + 1,
    premium_info: new Types.ObjectId(premiumInfo?._id),
  });
  await newUser.save();
}

export async function updateUser(body: IUser) {
  await dbConnect();

  if (!body?.id) throw new Error("Không thể tìm thấy người dùng");

  const { premium_info, ...details } = body;
  const quotations = details.quotations.map((q) => new Types.ObjectId(q.id));
  await User.findOneAndUpdate(
    { _id: new Types.ObjectId(body.id) },
    { ...details, quotations },
  );

  if (premium_info) {
    const { id, ...rest } = premium_info;
    await PremiumInfo.updateOne({ _id: premium_info.id }, rest);
  }
}

export async function getUserDetailById(id: string) {
  await dbConnect();

  const userDetail = await User.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "MyVRQuotation",
        localField: "quotations",
        foreignField: "_id",
        as: "quotations",
      },
    },
    {
      $lookup: {
        from: "MyVRPremiumInfo",
        localField: "premium_info",
        foreignField: "_id",
        as: "premium_info",
      },
    },
    {
      $unwind: {
        path: "$premium_info",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 0,
        id: { $toString: "$_id" },
        simplified_id: 1,
        user_name: 1,
        user_email: 1,
        user_phone: 1,
        role: 1,
        address: 1,
        quotations: {
          $map: {
            input: "$quotations",
            as: "quotation",
            in: {
              id: { $toString: "$$quotation._id" },
              simplified_id: "$$quotation.simplified_id",
              title: "$$quotation.title",
            },
          },
        },
        premium_info: {
          id: { $toString: "$premium_info._id" },
          is_vip: "$premium_info.is_vip",
          expired_date: "$premium_info.expired_date",
          priority_level: "$premium_info.priority_level",
        },
        status: 1,
      },
    },
  ]);
  return userDetail[0];
}

export async function removeUserById(id: string) {
  await dbConnect();

  const doc = await User.findOneAndDelete({
    _id: new Types.ObjectId(id),
  })
    .populate("premium_info", "_id")
    .populate("quotations", "_id");
  if (!doc) throw new Error("Không thể xóa người dùng");

  if (doc && doc.premium_info?._id) {
    await removePremiumInfoById(doc.premium_info?._id);
  }

  if (doc && doc.quotations) {
    const removedQuotationIds = doc.quotations.map(
      (q: any) => new Types.ObjectId(q._id as string),
    );
    await Quotation.deleteMany({ _id: { $in: removedQuotationIds } });
  }
}

export const getUserDetailByPhoneNumber = cache(
  async (phone: string | undefined) => {
    await dbConnect();

    const doc = await User.findOne({ user_phone: phone })
      .populate("quotations")
      .populate("premium_info");

    return doc?.toObject() as IUser;
  },
);

export async function userUpdateProfile(body: Record<string, any>) {
  await dbConnect();

  const {
    form: { phone, password },
    userDetail: { id },
    enablePhoneEdit,
  } = body;

  const userDetailFromDB = await getUserDetailByPhoneNumber(phone);
  if (!userDetailFromDB) throw new Error();

  if (userDetailFromDB?.password_changed_count >= 3) {
    throw new Error("Thông tin đăng nhập đã được cập nhật 3 lần");
  }

  if (enablePhoneEdit) {
    const existingUserWithPhone = await User.findOne({
      user_phone: phone,
      _id: { $ne: new Types.ObjectId(id) },
    });

    if (existingUserWithPhone)
      return { error: { phone: "Số điện thoại đã được sử dụng" } };
  }

  const result = await User.findOneAndUpdate(
    { _id: new Types.ObjectId(id) },
    {
      user_password: password,
      $inc: { password_changed_count: 1 },
      ...(enablePhoneEdit ? { user_phone: phone } : {}),
    },
  );

  return result?.toObject();
}

export async function addQuotationIdToUser(
  userId: string | undefined,
  quotationId: string | undefined,
) {
  if (!userId || !quotationId) throw new Error();

  await dbConnect();
  await User.updateOne(
    {
      _id: userId,
    },
    {
      $addToSet: {
        quotations: new Types.ObjectId(quotationId),
      },
    },
  );
}

export async function getAllVRtubeVideosById(userId: string) {
  await dbConnect();

  const userDoc = await User.findOne({ _id: userId });
  const docs = await VRtubeVideo.find({
    _id: { $in: userDoc.video_list },
    status: "published",
    from_MyVR: true,
  })
    .select("-viewVersions -categories -tags -creator")
    .sort({ created_at: -1 });
  if (!docs) throw new Error();

  const videos = docs.map((video) => {
    const object = video.toObject();

    return {
      ...object,
      thumbnail_img: getCloudFrontSignedURl({
        url: object.thumbnail_img,
        dateLessThan: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        fallbackUrl: "/imgs/thumbnail-placeholder.svg",
      }),
      source: [
        getCloudFrontSignedURl({
          url: object.source[0],
          dateLessThan: new Date(
            Date.now() + 1000 * 60 * 60 * 24,
          ).toISOString(),
        }),
      ],
    };
  });
  return videos;
}
