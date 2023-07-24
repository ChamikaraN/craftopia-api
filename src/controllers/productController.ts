// controllers/productController.ts
import { Request, Response } from "express";
import ProductService from "../services/productService";

const productService = new ProductService();

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, stock, images, status } =
      req.body;
    const newProduct = await productService.createProduct(
      name,
      description,
      price,
      category,
      stock,
      images,
      status
    );
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Unable to create product." });
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch products." });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch product." });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, category, stock, images, status } =
      req.body;
    const updatedProduct = await productService.updateProduct(
      req.params.id,
      name,
      description,
      price,
      category,
      stock,
      images,
      status
    );
    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: "Unable to update product." });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await productService.deleteProduct(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }
    res.json(deletedProduct);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete product." });
  }
};
