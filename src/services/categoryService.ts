// services/categoryService.ts
import Category, { ICategory } from "../models/category";

class CategoryService {
  async createCategory(
    name: string,
    description: string,
    image: string,
    status: boolean
  ): Promise<ICategory> {
    const newCategory = new Category({
      name,
      description,
      image,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await newCategory.save();
  }

  async getAllCategories(): Promise<ICategory[]> {
    return await Category.find();
  }

  async getCategoryById(id: string): Promise<ICategory | null> {
    return await Category.findById(id);
  }

  async updateCategory(
    id: string,
    name: string,
    description: string,
    image: string,
    status: boolean
  ): Promise<ICategory | null> {
    return await Category.findByIdAndUpdate(
      id,
      { name, description, image, status, updatedAt: new Date() },
      { new: true }
    );
  }

  async deleteCategory(id: string): Promise<ICategory | null> {
    return await Category.findByIdAndDelete(id);
  }
}

export default CategoryService;
