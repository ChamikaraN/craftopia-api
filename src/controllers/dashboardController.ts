// controllers/productController.ts
import { Request, Response } from "express";
import ProductService from "../services/productService";
import logger from "../utils/logger";
import OrderService from "../services/orderService";
import CategoryService from "../services/categoryService";

const productService = new ProductService();
const orderService = new OrderService();
const categoryService = new CategoryService();

export const status = async (req: Request, res: Response) => {
  try {
    const totalCategories = await categoryService.getTotalCategoriesCount();
    const totalProducts = await productService.getTotalProductsCount();
    const totalOrders = await orderService.getTotalOrdersCount();
    const totalRevenue = await orderService.getTotalRevenue();

    res.json({
      totalCategories,
      totalProducts,
      totalOrders,
      totalRevenue,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const bestSellingProducts = async (req: Request, res: Response) => {
  try {
    const bestSellingProducts = await productService.getBestSellingProducts();
    if (!bestSellingProducts) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.json(bestSellingProducts);
  } catch (error) {
    res.status(500).json({ error });
  }
};
