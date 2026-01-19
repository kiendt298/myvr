import mongoose, { Schema } from "mongoose";

export interface IPremiumInfo extends Document {
  id: string;
  is_vip: boolean;
  expired_date: Date;
  priority_level: number;
}

const PremiumInfoSchema: Schema<IPremiumInfo> = new Schema<IPremiumInfo>(
  {
    is_vip: { type: Boolean },
    expired_date: { type: Date },
    priority_level: { type: Number }
  },
  {
    collection: "MyVRPremiumInfo",
    toObject: {
      getters: true,
      virtuals: false,
      transform: function (doc, ret, options) {
        if (ret._id) {
          ret.id = ret._id.toString();
          delete ret._id;
        }
      },
    },
    timestamps: false
  }
);

const PremiumInfo =
  mongoose.models.MyVRPremiumInfo ||
  mongoose.model<IPremiumInfo>("MyVRPremiumInfo", PremiumInfoSchema);

export default PremiumInfo;


