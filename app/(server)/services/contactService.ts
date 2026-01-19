"use server";

import escapeStringRegexp from "escape-string-regexp";
import { dbConnect } from "../database/db-connection";
import ContactRequest from "../database/models/ContactRequest";
import { getLatestSimplifiedId } from "@/app/(common)/_helpers/action";
import { getUserDetailByPhoneNumber } from "./userService";
import { CONTACT_STATUSES } from "@/app/(common)/_utils/constant";
import { Types } from "mongoose";
import { reCaptchaCreateAssesment } from "./thirdPartyService";
import { GoogleReCaptchaActionEnum } from "@/app/(common)/_utils/enums";

export async function getContactsBySearchParams({
  pagination,
  sorting,
  filtering,
  briefServiceId,
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
          { name: { $regex: regex } },
          { simplified_id: { $regex: regex } },
          { phone: { $regex: regex } },
          { message: { $regex: regex } },
        ],
      }
    : {};
  const briefServiceQuery = briefServiceId
    ? {
        package_id: briefServiceId,
      }
    : {};
  const statusQuery = status
    ? {
        status: {
          $regex: escapeStringRegexp(status),
        },
      }
    : {};
  const aggregateResults = await ContactRequest.aggregate([
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
              name: 1,
              package_id: 1,
              status: 1,
              phone: 1,
              email: 1,
              message: 1,
              date: 1,
              updated_at: 1,
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

export async function createContactRequest(
  token: string | undefined,
  {
    name,
    phone,
    email,
    serviceId,
    message,
  }: {
    name: string;
    phone: string;
    serviceId: string;
    message: string;
    email?: string;
  },
) {
  const reCaptchaResult = await reCaptchaCreateAssesment({
    token,
    expectedAction: GoogleReCaptchaActionEnum.CREATE_CONTACT_SUBMIT,
  });
  if (!reCaptchaResult) throw new Error("Do not pass ReCaptcha validation");

  await dbConnect();

  const latestPostSimplifiedId = await getLatestSimplifiedId({
    model: ContactRequest,
  });
  const newContactRequestBody: Record<string, any> = {
    name,
    simplified_id: latestPostSimplifiedId + 1,
    phone,
    email,
    package_id: serviceId,
    message,
    status: CONTACT_STATUSES.NEW,
  };
  const existedUser = await getUserDetailByPhoneNumber(phone);
  if (existedUser) {
    newContactRequestBody.name = name || existedUser.user_name;
    newContactRequestBody.email = email || existedUser.user_email;
  }

  const newContactRequest = new ContactRequest(newContactRequestBody);
  await newContactRequest.save();
}

export async function removeContactRequestById(id: string) {
  await dbConnect();

  const doc = await ContactRequest.findOneAndDelete({
    _id: new Types.ObjectId(id),
  });
  if (!doc) throw new Error("Không thể xóa yêu cầu");
}

export async function getContactStatsForEadHome(greaterThan: Date) {
  await dbConnect();

  const result = await ContactRequest.aggregate([
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
          package: "$documents.package_id",
        },
        numOfNewContact: {
          $count: {},
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
