// models/productModel.ts
import mongoose, { Document, Schema } from "mongoose";

export interface ProductDocument extends Document {
  name: string;
  description: string;
  price: number;
  category: mongoose.Types.ObjectId;
  stock: number;
  images: string[];
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema: Schema<ProductDocument> = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  stock: Number,
  images: [String],
  status: Boolean,
  createdAt: Date,
  updatedAt: Date,
});

const Product = mongoose.model<ProductDocument>("Product", productSchema);
export default Product;
