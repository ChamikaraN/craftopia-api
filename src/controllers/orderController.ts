import { Request, Response } from 'express';
import * as orderService from '../services/orderService';
import logger from '../utils/logger';

export const createOrder = async (req: Request, res: Response) => {
  try {
    const {
      products,
      totalAmount,
      customerName,
      contactNumber,
      shippingAddress,
    } = req.body;
    const orderData = {
      products,
      totalAmount,
      customerName,
      contactNumber,
      shippingAddress,
    };
    const newOrder = await orderService.createOrder(orderData);
    res.status(201).json(newOrder);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error });
  }
};

export const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await orderService.getAllOrders();
    res.json(orders);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Unable to fetch orders.' });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const orderData = { id: req.params.id };
    const order = await orderService.getOrderById(orderData);
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    res.json(order);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Unable to fetch order.' });
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
    const orderData = {
      id: req.params.id,
      products,
      totalAmount,
      customerName,
      contactNumber,
      shippingAddress,
      status,
    };
    const updatedOrder = await orderService.updateOrder(orderData);
    if (!updatedOrder) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    res.json(updatedOrder);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Unable to update order.' });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const orderData = { id: req.params.id };
    const deletedOrder = await orderService.deleteOrder(orderData);
    if (!deletedOrder) {
      return res.status(404).json({ error: 'Order not found.' });
    }
    res.json(deletedOrder);
  } catch (error) {
    logger.error(error);
    res.status(500).json({ error: 'Unable to delete order.' });
  }
};
