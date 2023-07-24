// services/productService.ts
import Product, { IProduct } from "../models/product";

class ProductService {
  async createProduct(
    name: string,
    description: string,
    price: number,
    category: string,
    stock: number,
    images: string[],
    status: boolean
  ): Promise<IProduct> {
    const newProduct = new Product({
      name,
      description,
      price,
      category,
      stock,
      images,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return await newProduct.save();
  }

  async getAllProducts(): Promise<IProduct[]> {
    return await Product.find();
  }

  async getProductById(id: string): Promise<IProduct | null> {
    return await Product.findById(id);
  }

  async updateProduct(
    id: string,
    name: string,
    description: string,
    price: number,
    category: string,
    stock: number,
    images: string[],
    status: boolean
  ): Promise<IProduct | null> {
    return await Product.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        category,
        stock,
        images,
        status,
        updatedAt: new Date(),
      },
      { new: true }
    );
  }

  async deleteProduct(id: string): Promise<IProduct | null> {
    return await Product.findByIdAndDelete(id);
  }
}

export default ProductService;
