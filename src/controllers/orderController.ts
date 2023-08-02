// controllers/orderController.ts
import { Request, Response } from "express";
import OrderService from "../services/orderService";

const orderService = new OrderService();

export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      products,
      totalAmount,
      customerName,
      contactNumber,
      shippingAddress,
    } = req.body;
    const newOrder = await orderService.createOrder(
      products,
      totalAmount,
      customerName,
      contactNumber,
      shippingAddress
    );
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: "Unable to create order." });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch orders." });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const order = await orderService.getOrderById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found." });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch order." });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const {
      products,
      totalAmount,
      customerName,
      contactNumber,
      shippingAddress,
      status,
    } = req.body;
    const updatedOrder = await orderService.updateOrder(
      req.params.id,
      products,
      totalAmount,
      customerName,
      contactNumber,
      shippingAddress,
      status
    );
    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found." });
    }
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: "Unable to update order." });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deletedOrder = await orderService.deleteOrder(req.params.id);
    if (!deletedOrder) {
      return res.status(404).json({ error: "Order not found." });
    }
    res.json(deletedOrder);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete order." });
  }
};
