"use server";
import { Types } from "mongoose";
import { dbConnect } from "../database/db-connection";
import PremiumInfo, { IPremiumInfo } from "../database/models/PremiumInfo";

export async function createPremiumInfo(body: IPremiumInfo | undefined) {
  try {
    if (!body) throw new Error("Không tìm thấy thông tin Premium");

    await dbConnect();

    const newPremiumInfo = new PremiumInfo(body);
    const result = await newPremiumInfo.save();

    return result;
  } catch (error) {
    console.log(`Lỗi tạo mới PremiumInfo: ${error}`);
    return null;
  }
}

export async function removePremiumInfoById(id: string) {
  await dbConnect();

  await PremiumInfo.deleteOne({ _id: new Types.ObjectId(id) });
}
