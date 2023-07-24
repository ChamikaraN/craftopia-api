// controllers/categoryController.ts
import { Request, Response } from "express";
import CategoryService from "../services/categoryService";
import logger from "../utils/logger";

const categoryService = new CategoryService();

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, image, status } = req.body;
    const newCategory = await categoryService.createCategory(
      name,
      description,
      image,
      status
    );
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: "Unable to create category." });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch categories." });
  }
};

export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch category." });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, image, status } = req.body;
    const updatedCategory = await categoryService.updateCategory(
      req.params.id,
      name,
      description,
      image,
      status
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: "Unable to update category." });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const deletedCategory = await categoryService.deleteCategory(req.params.id);
    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }
    res.json(deletedCategory);
  } catch (error) {
    res.status(500).json({ error: "Unable to delete category." });
  }
};
