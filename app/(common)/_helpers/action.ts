import { Model } from "mongoose";

export async function getLatestSimplifiedId<T extends Model<any>>({ model }: { model: T }) {
  const records = await model.find().sort({ simplified_id: -1 }).limit(1);

  return records[0]?.simplified_id ?? 0;
}
