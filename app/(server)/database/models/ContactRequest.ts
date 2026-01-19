import mongoose, { Schema } from "mongoose";

export interface IContactRequest extends Document {
  id?: string;
  simplified_id: number;
  name?: string;
  package_id: string;
  status: string;
  phone: string;
  email?: string;
  message: string;
  date: Date;
  updated_at: Date;
}

const ContactRequestSchema: Schema<IContactRequest> =
  new Schema<IContactRequest>(
    {
      simplified_id: { type: Number },
      name: { type: String, sparse: true },
      package_id: { type: String },
      message: { type: String },
      status: { type: String },
      phone: { type: String },
      email: { type: String, sparse: true },
    },
    {
      collection: "MyVRContactRequest",
      toObject: {
        getters: true,
        virtuals: false,
        transform: function (doc, ret, options) {
          ret.id = ret._id.toString();
          delete ret._id;
        },
      },
      timestamps: {
        createdAt: "date",
      },
    },
  );

const ContactRequest =
  mongoose.models.MyVRContactRequest ||
  mongoose.model<IContactRequest>("MyVRContactRequest", ContactRequestSchema);

export default ContactRequest;
