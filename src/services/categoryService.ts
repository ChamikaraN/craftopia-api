import Category, { ICategory } from '../models/category';

export async function createCategory(categoryData: any): Promise<ICategory> {
  const newCategory = new Category({
    name: categoryData.name,
    description: categoryData.description,
    image: categoryData.image,
    status: categoryData.status,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return await newCategory.save();
}

export async function getAllCategories(): Promise<ICategory[]> {
  return await Category.find().sort({ createdAt: -1 });
}

export async function getCategoryById(id: string): Promise<ICategory | null> {
  return await Category.findById(id);
}

export async function updateCategory(
  id: string,
  categoryData: any,
): Promise<ICategory | null> {
  return await Category.findByIdAndUpdate(
    id,
    {
      name: categoryData.name,
      description: categoryData.description,
      image: categoryData.image,
      status: categoryData.status,
      updatedAt: new Date(),
    },
    { new: true },
  );
}

export async function deleteCategory(id: string): Promise<ICategory | null> {
  return await Category.findByIdAndDelete(id);
}

export async function getTotalCategoriesCount(): Promise<number> {
  return await Category.countDocuments();
}
