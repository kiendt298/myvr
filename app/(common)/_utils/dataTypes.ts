// interface IQuotation extends Document {
//     id?: number;
//     title?: string;
//     package?: string;
//     phone?: string;
//     customerName?: string;
//     place?: string;
//     content?: string;
//     estimatedCost?: string;
//     status?: string;
//     saler?: string;
//     date?: string;
// }

// const QuotationSchema: Schema<IQuotation> = new mongoose.Schema({
//   title: { type: String },
//   package: { type: String },
//   phone: { type: String },
//   customerName: { type: String },
//   place: { type: String },
//   content: { type: String },
//   estimatedCost: { type: String },
//   status: { type: String },
//   saler: { type: String },
//   date: { type: String },
// });

// export const Quotation: Model<IQuotation> =
//   mongoose.models.Quotation || mongoose.model("Quotation", QuotationSchema);

// Need update api follow this model. Consider create a mapper if needed. TODO Duy
export interface Quotation {
  id?: number;
  title?: string;
  package?: string;
  phone?: string;
  customerName?: string;
  place?: string;
  content?: string;
  estimatedCost?: number;
  status?: string;
  saler?: string;
  date?: string;
}

export interface User {
  id?: number | string;
  phone?: string;
  name?: string;
  address?: string;
  quotations?: Quotation[];
  status?: string;
  createdDate?: string;
  premiumInfo?: PremiumInfo;
}

export interface PremiumInfo {
  isVip?: boolean;
  expiredDate?: string;
  priorityLevel?: number;
}

export interface Post {
  id?: number | string;
  title?: string;
  titleUrl?: string;
  packageId?: string;
  content?: string;
  status?: string;
  date?: string;
  thumbnail?: string;
  views?: string;
  likes?: string;
}
