import mongoose, { Schema } from "mongoose";
import { IUser } from "./User";

export enum Visibility {
  PUBLIC = "public",
  UNDEFINED = "undefined",
  PRIVATE = "private",
}

export enum CameraType {
  MODEL_A = "MODEL_A",
  MODEL_B = "MODEL_B",
}

export enum CameraAngle {
  CAMERA_ANGLE_180 = "180",
  CAMERA_ANGLE_FISH_EYE = "fish-eye",
  CAMERA_ANGLE_360 = "360",
}

export enum VideoStatus {
  PUBLISHED = "published",
  PENDING = "pending",
}

export enum VideoFormat {
  VR_3D = "vr-3d",
  AR = "ar",
  VR_NORMAL = "vr-normal",
}

export enum TranscoderStatus {
  SUBMITTED = "SUBMITTED",
  PROGRESSING = "PROGRESSING",
  COMPLETE = "COMPLETE",
  ERROR = "ERROR",
}

export interface IVideoViewTracking {
  incrementAmount: number;
  timestamps: Date;
}

export interface ITranscoderJob {
  id: string;
  status: TranscoderStatus;
}

export interface IVRtubeVideo extends Document {
  id: string;
  simplified_id: number;
  creator: IUser;
  title: string;
  vietnameseTitle?: string;
  slug: string;
  vietnameseSlug?: string;
  desc: string;
  thumbnail_img: string;
  source: string[];
  categories: Record<string, any>[];
  visibility: Visibility;
  camera_type: CameraType;
  camera_angle: CameraAngle;
  video_format: VideoFormat;
  duration?: number;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  download_quantity: number;
  status: VideoStatus;
  tags: Record<string, any>[];
  transcoder_job: ITranscoderJob;
  viewVersions: IVideoViewTracking[];
  from_MyVR?: boolean;
  created_at: Date | string;
  updated_at: Date | string;
}

const VideoSchema: Schema<IVRtubeVideo> = new Schema<IVRtubeVideo>(
  {
    simplified_id: { type: Number, required: true, unique: true },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "MyVRUser",
      required: true,
    },
    title: { type: String, trim: true, required: true },
    vietnameseTitle: { type: String, trim: true },
    slug: { type: String, trim: true, required: true },
    vietnameseSlug: { type: String, trim: true },
    desc: { type: String },
    source: [{ type: String, trim: true, required: true }],
    thumbnail_img: { type: String },
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    visibility: { type: String, enum: Visibility },
    camera_type: { type: String, enum: CameraType },
    camera_angle: { type: String, enum: CameraAngle },
    video_format: { type: String, enum: VideoFormat },
    duration: { type: Number },
    views: { type: Number },
    likes: { type: Number },
    shares: { type: Number },
    comments: { type: Number },
    download_quantity: { type: Number },
    status: { type: String, enum: VideoStatus, required: true },
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    transcoder_job: {
      id: { type: String },
      status: { type: String, enum: TranscoderStatus },
    },
    viewVersions: [
      {
        _id: false,
        incrementAmount: { type: Number, required: true },
        timestamps: { type: Date, required: true },
      },
    ],
    from_MyVR: { type: Boolean, sparse: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
  },
  {
    collection: "Video",
    toObject: {
      getters: true,
      transform: function (doc, ret, options) {
        ret.id = ret._id.toString();
        delete ret._id;
      },
      versionKey: false,
    },
  },
);

const VRtubeVideo =
  mongoose.models.Video || mongoose.model<IVRtubeVideo>("Video", VideoSchema);

export default VRtubeVideo;
