// services/productService.ts
import Product, { IProduct } from "../models/product";

class ProductService {
  async createProduct(product: IProduct): Promise<IProduct> {
    const newProduct = new Product({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image,
      status: product.status,
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
    image: string,
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
        image,
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
