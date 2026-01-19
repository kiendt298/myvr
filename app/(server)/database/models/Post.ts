import mongoose, { Schema } from "mongoose";

export interface IPost extends Document {
  id?: string;
  simplified_id: number;
  title: string;
  title_url: string;
  package_id: string;
  content: string;
  status: string;
  date: Date;
  thumbnail: string;
  views: number;
  likes: number;
  updated_at: Date,
}

const PostSchema: Schema<IPost> = new Schema<IPost>(
  {
    simplified_id: { type: Number },
    title: { type: String },
    title_url: { type: String },
    package_id: { type: String },
    content: { type: String },
    status: { type: String },
    thumbnail: { type: String },
    views: { type: Number },
    likes: { type: Number },
  },
  {
    collection: "MyVRPost",
    toObject: {
      getters: true,
      virtuals: false,
      transform: function(doc, ret, options) {
        ret.id = ret._id.toString();
        delete ret._id;
      },
    },
    timestamps: {
      'createdAt': 'date'
    }
  }
);

const Post =
  mongoose.models.MyVRPost ||
  mongoose.model<IPost>("MyVRPost", PostSchema);

export default Post;


