import mongoose, { Document, Schema, Model } from "mongoose";

// Interface para o documento de Lead
export interface ILead extends Document {
  name: string;
  email: string;
  phone?: string;
  message?: string;
  userId: mongoose.Types.ObjectId;
}

// Schema do Lead
const LeadSchema: Schema = new Schema<ILead>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  message: { type: String, required: false },
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Modelo de Lead com a tipagem de ILead
const Lead: Model<ILead> = mongoose.model<ILead>("Lead", LeadSchema);

export default Lead;
