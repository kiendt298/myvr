import type { NextApiRequest, NextApiResponse } from "next";
import { dbConnect } from "../database/db-connection";
import { Quotation } from "@/app/(common)/_utils/dataTypes";
import { HTTP_METHODS } from "@/app/(common)/_utils/constant";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   await dbConnect();

//   if (req.method === HTTP_METHODS.POST) {
//     try {
//       const newQuotation = new Quotation(req.body);
//       const savedQuotation = await newQuotation.save();
//       res.status(201).json(savedQuotation);
//     } catch (error) {
//       res.status(500).json({ error: "Đã có lỗi xảy ra khi tạo báo giá!" });
//     }
//   } else {
//     res.status(405).json({ error: "Method not allowed" });
//   }
// }
