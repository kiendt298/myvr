"use server";

import { dbConnect } from "../database/db-connection";
import escapeStringRegexp from "escape-string-regexp";
import Quotation, { IQuotation } from "../database/models/Quotation";
import { Types } from "mongoose";
import { getLatestSimplifiedId } from "@/app/(common)/_helpers/action";
import { revalidatePath } from "next/cache";
import {
  addQuotationIdToUser,
  getUserDetailByPhoneNumber,
} from "./userService";
import { QUOTATION_STATUSES } from "@/app/(common)/_utils/constant";

export async function getQuotationsBySearchParams({
  pagination,
  sorting,
  filtering,
  briefServiceTitle,
  quotationStatus,
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
          { phone: { $regex: regex } },
          { customer_name: { $regex: regex } },
          { place: { $regex: regex } },
          { saler: { $regex: regex } },
        ],
      }
    : {};
  const briefServiceQuery = briefServiceTitle
    ? {
        package: {
          $regex: escapeStringRegexp(briefServiceTitle),
        },
      }
    : {};
  const quotationStatusQuery = quotationStatus
    ? {
        status: {
          $regex: escapeStringRegexp(quotationStatus),
        },
      }
    : {};

  const aggregateResults = await Quotation.aggregate([
    {
      $match: {
        ...query,
        ...briefServiceQuery,
        ...quotationStatusQuery,
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
              package: 1,
              phone: 1,
              customer_name: 1,
              place: 1,
              content: 1,
              estimated_cost: 1,
              status: 1,
              saler: 1,
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

export async function createQuotation(body: IQuotation) {
  await dbConnect();

  const latestQuotationSimplifiedId = await getLatestSimplifiedId({
    model: Quotation,
  });
  const newQuotation = new Quotation({
    ...body,
    simplified_id: latestQuotationSimplifiedId + 1,
  });
  const result = await newQuotation.save();

  const { phone } = body;
  const userDetail = await getUserDetailByPhoneNumber(phone);
  if (userDetail && userDetail.id) {
    await addQuotationIdToUser(userDetail.id, result._id);
  }

  revalidatePath("/ead/quotations");
  revalidatePath("/ead/quotation/create-quotation");
  return result.toObject();
}

export async function updateQuotation(body: IQuotation) {
  await dbConnect();

  if (!body?.id) throw new Error("Không thể tim thấy báo giá");

  const result = await Quotation.findOneAndUpdate(
    { _id: new Types.ObjectId(body.id) },
    body,
    { new: true },
  );
  revalidatePath("/ead/quotations");
  revalidatePath("/ead/quotation/create-quotation");
  return result?.toObject();
}

export async function getQuotationDetailById(id: string) {
  await dbConnect();

  const quotation = await Quotation.findById(id);
  return quotation.toObject() as IQuotation;
}

export async function getQuotationDetailBySimplifiedId(id: string) {
  await dbConnect();

  const quotation = await Quotation.findOne({ simplified_id: parseInt(id) });
  return quotation.toObject() as IQuotation;
}

export async function removeQuotationById(id: string) {
  await dbConnect();

  const result = await Quotation.deleteOne({ _id: new Types.ObjectId(id) });
  if (!result.acknowledged || !result.deletedCount)
    throw new Error("Không thể xóa báo giá");
}

export async function getQuotationDetailBySimplifedId(
  simplifiedId: string | undefined,
) {
  await dbConnect();

  const doc = await Quotation.findOne({ simplified_id: simplifiedId });
  return doc?.toObject() as IQuotation;
}

export async function getQuotationStatsForEadHome(greaterThan: Date) {
  await dbConnect();

  const result = await Quotation.aggregate([
    {
      $match: {
        date: {
          $gte: greaterThan,
          $lt: new Date(),
        },
      },
    },
    {
      $group: {
        _id: {
          month: { $month: "$date" },
          year: { $year: "$date" },
        },
        documents: { $push: "$$ROOT" },
      },
    },
    { $unwind: "$documents" },
    {
      $group: {
        _id: {
          month: "$_id.month",
          year: "$_id.year",
          package: "$documents.package",
        },
        totalEstimatedCost: {
          $sum: {
            $cond: [
              {
                $regexMatch: {
                  input: "$documents.status",
                  regex: escapeStringRegexp(QUOTATION_STATUSES.DONE),
                },
              },
              "$documents.estimated_cost",
              0,
            ],
          },
        },
        numOfNewQuotations: {
          $count: {},
        },
        numOfClosedQuotations: {
          $sum: {
            $cond: [
              {
                $regexMatch: {
                  input: "$documents.status",
                  regex: escapeStringRegexp(QUOTATION_STATUSES.DONE),
                },
              },
              1,
              0,
            ],
          },
        },
      },
    },
    {
      $sort: {
        "_id.month": -1,
      },
    },
  ]);

  return result;
}
