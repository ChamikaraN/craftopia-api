import Order, { IOrder } from '../models/order';
import Product from '../models/product';
import logger from '../utils/logger';

export async function createOrder(orderData: any): Promise<IOrder> {
  const {
    products,
    totalAmount,
    customerName,
    contactNumber,
    shippingAddress,
  } = orderData;

  const newOrder = new Order({
    products,
    totalAmount,
    customerName,
    contactNumber,
    shippingAddress,
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Update the product stock based on the ordered quantity
  for (const orderProduct of products) {
    const { product, quantity } = orderProduct;
    const selectedProduct = await Product.findById(product);
    if (!selectedProduct) {
      throw new Error(`Product not found with ID: ${product}`);
    }

    if (selectedProduct.stock < quantity) {
      throw new Error(
        `Insufficient stock for product: ${selectedProduct.name}`,
      );
    }

    selectedProduct.stock -= quantity;
    selectedProduct.noOfSales += quantity;
    await selectedProduct.save();
  }

  // Save the order and return it
  return await newOrder.save();
}

export async function getAllOrders(): Promise<IOrder[]> {
  return await Order.find().sort({ createdAt: -1 });
}

export async function getOrderById(orderData: any): Promise<IOrder | null> {
  const { id } = orderData;
  return await Order.findById(id);
}

export async function updateOrder(orderData: any): Promise<IOrder | null> {
  const {
    id,
    products,
    totalAmount,
    customerName,
    contactNumber,
    shippingAddress,
    status,
  } = orderData;

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
    { new: true },
  );
}

export async function deleteOrder(orderData: any): Promise<IOrder | null> {
  const { id } = orderData;
  return await Order.findByIdAndDelete(id);
}

export async function getTotalOrdersCount(): Promise<number> {
  return await Order.countDocuments();
}

export async function getTotalRevenue(): Promise<number> {
  const completedOrders = await Order.find({ status: 'pending' });

  let totalRevenue = 0;
  for (const order of completedOrders) {
    totalRevenue += order.totalAmount;
  }

  return totalRevenue;
}
