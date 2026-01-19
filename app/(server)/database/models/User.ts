import mongoose, { Schema, Document, Types } from "mongoose";
import { IPremiumInfo } from "./PremiumInfo";
import { IQuotation } from "./Quotation";
import { IVRtubeVideo } from "./VRtubeVideo";

export enum CreatorStatus {
  PUBLIC = "public",
  PENDING = "pending",
  PRIVATE = "private",
}

export enum CreatorRoleType {
  ADMIN = "admin",
  USER = "user",
}

export interface IUser extends Document {
  id: string;
  simplified_id: number;
  user_email: string;
  user_phone: string;
  user_name: string;
  user_password: string;
  user_token: string;
  address: string;
  role: CreatorRoleType;
  quotations: IQuotation[];
  status: string;
  premium_info?: IPremiumInfo;
  provider_account_id?: string;
  password_changed_count: number;
  video_list: IVRtubeVideo[] | Types.ObjectId[] | string[];
  created_at: Date | string;
  updated_at: Date | string;
}

const UserSchema: Schema<IUser> = new Schema<IUser>(
  {
    simplified_id: { type: Number, required: true, unique: true },
    user_email: { type: String },
    user_phone: { type: String },
    user_name: { type: String },
    user_password: { type: String },
    user_token: { type: String },
    address: { type: String },
    quotations: [{ type: Schema.Types.ObjectId, ref: "MyVRQuotation" }],
    role: { type: String, enum: CreatorRoleType, required: true },
    status: { type: String },
    premium_info: {
      type: Schema.Types.ObjectId,
      ref: "MyVRPremiumInfo",
      spare: true,
    },
    provider_account_id: { type: String, unique: true, sparse: true },
    password_changed_count: { type: Number },
    video_list: [{ type: Schema.Types.ObjectId, ref: "Video" }],
  },
  {
    collection: "MyVRUser",
    toObject: {
      getters: true,
      virtuals: false,
      transform: function (doc, ret, options) {
        ret.id = ret._id.toString();
        delete ret._id;
        ret.quotations = ret.quotations.map((_: Types.ObjectId) =>
          _.toString(),
        );
        ret.video_list = ret.video_list.map((_: Types.ObjectId) =>
          _.toString(),
        );
        return ret;
      },
    },
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },
);

const User =
  mongoose.models?.MyVRUser || mongoose.model<IUser>("MyVRUser", UserSchema);

export default User;
