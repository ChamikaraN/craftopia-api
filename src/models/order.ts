// models/orderModel.ts
import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  products: {
    product: mongoose.Types.ObjectId;
    price: { type: Number; required: true };
    quantity: number;
  }[];
  totalAmount: number;
  customerName: string;
  contactNumber: string;
  shippingAddress: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema: Schema<IOrder> = new mongoose.Schema({
  products: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  customerName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  shippingAddress: { type: String, required: true },
  status: { type: String, required: true },
  createdAt: { type: Date, required: true },
  updatedAt: { type: Date, required: true },
});

const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
