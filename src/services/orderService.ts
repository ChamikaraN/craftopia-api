// services/orderService.ts
import Order, { IOrder } from "../models/order";
import Product from "../models/product";

class OrderService {
  async createOrder(
    products: {
      product: string;
      quantity: string;
      price: string;
    }[],
    totalAmount: string,
    customerName: string,
    contactNumber: string,
    shippingAddress: string
  ): Promise<IOrder> {
    const newOrder = new Order({
      products,
      totalAmount,
      customerName,
      contactNumber,
      shippingAddress,
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Update the product stock based on the ordered quantity
    for (const orderProduct of products) {
      const productId = orderProduct.product;
      const orderedQuantity = parseInt(orderProduct.quantity, 10);

      const product = await Product.findById(productId);
      if (!product) {
        throw new Error(`Product not found with ID: ${productId}`);
      }

      if (product.stock < orderedQuantity) {
        throw new Error(`Insufficient stock for product: ${product.name}`);
      }

      product.stock -= orderedQuantity;
      await product.save();
    }

    // Save the order and return it
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

  async getTotalOrdersCount(): Promise<number> {
    return await Order.countDocuments();
  }

  async getTotalRevenue(): Promise<number> {
    const completedOrders = await Order.find({ status: "pending" });

    let totalRevenue = 0;
    for (const order of completedOrders) {
      totalRevenue += order.totalAmount;
    }

    return totalRevenue;
  }
}

export default OrderService;
