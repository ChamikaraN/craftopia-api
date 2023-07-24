// services/productService.ts
import Product, { ProductDocument } from "../models/productModel";

class ProductService {
  async createProduct(
    name: string,
    description: string,
    price: number,
    category: string,
    stock: number,
    images: string[],
    status: boolean
  ): Promise<ProductDocument> {
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

  async getAllProducts(): Promise<ProductDocument[]> {
    return await Product.find();
  }

  async getProductById(id: string): Promise<ProductDocument | null> {
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
  ): Promise<ProductDocument | null> {
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

  async deleteProduct(id: string): Promise<ProductDocument | null> {
    return await Product.findByIdAndDelete(id);
  }
}

export default ProductService;
