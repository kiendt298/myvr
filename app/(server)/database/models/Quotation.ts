import mongoose, { Schema, Document } from "mongoose";

export interface IQuotation extends Document {
  id?: string;
  simplified_id?: number;
  title?: string;
  package?: string;
  phone?: string;
  customer_name?: string;
  place?: string;
  content?: string;
  estimated_cost?: number;
  status?: string;
  saler?: string;
  date?: string;
}

const QuotationSchema: Schema<IQuotation> = new Schema<IQuotation>(
  {
    simplified_id: { type: Number },
    title: { type: String },
    package: { type: String },
    phone: { type: String },
    customer_name: { type: String },
    place: { type: String },
    content: { type: String },
    estimated_cost: { type: Number },
    status: { type: String },
    saler: { type: String },
  },
  {
    collection: "MyVRQuotation",
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
    timestamps: {
      createdAt: "date", // Use `date` to store the created date
    },
  },
);

const Quotation =
  mongoose.models.MyVRQuotation ||
  mongoose.model<IQuotation>("MyVRQuotation", QuotationSchema);

export default Quotation;
