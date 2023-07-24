// services/orderService.ts
import Order, { IOrder } from "../models/order";

class OrderService {
  async createOrder(
    products: {
      product: string;
      quantity: number;
    }[],
    totalAmount: number,
    customerName: string,
    contactNumber: string,
    shippingAddress: string,
    status: string
  ): Promise<IOrder> {
    const newOrder = new Order({
      products,
      totalAmount,
      customerName,
      contactNumber,
      shippingAddress,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await newOrder.save();
  }

  async getAllOrders(): Promise<IOrder[]> {
    return await Order.find();
  }

  async getOrderById(id: string): Promise<IOrder | null> {
    return await Order.findById(id);
  }

  async updateOrder(
    id: string,
    products: {
      product: string;
      quantity: number;
    }[],
    totalAmount: number,
    customerName: string,
    contactNumber: string,
    shippingAddress: string,
    status: string
  ): Promise<IOrder | null> {
    return await Order.findByIdAndUpdate(
      id,
      {
        products,
        totalAmount,
        customerName,
        contactNumber,
        shippingAddress,
        status,
        updatedAt: new Date(),
      },
      { new: true }
    );
  }

  async deleteOrder(id: string): Promise<IOrder | null> {
    return await Order.findByIdAndDelete(id);
  }
}

export default OrderService;
