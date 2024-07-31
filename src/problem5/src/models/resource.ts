import mongoose, { Schema, Document } from "mongoose";

export interface IResource extends Document {
  name: string;
  email: string;
  description: string;
  age: number;
  create_at: Date;
  update_at: Date;
}

const ResourceSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  description: { type: String },
  create_at: { type: Date, default: Date.now },
  update_at: { type: Date, default: Date.now },
});

const Resource = mongoose.model<IResource>("Resource", ResourceSchema);

export default Resource;
