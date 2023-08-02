// services/productService.ts
import Order from "../models/order";
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

  async getBestSellingProducts(): Promise<IProduct[]> {
    try {
      // Group and sum sales quantities for each product across all orders
      const bestSellingProducts = await Order.aggregate([
        { $unwind: "$products" },
        {
          $group: {
            _id: "$products.product",
            totalSalesQuantity: { $sum: "$products.salesQuantity" },
          },
        },
        { $sort: { totalSalesQuantity: -1 } },
        { $limit: 5 }, // Limit the results to the top 5 products
      ]).exec(); // Add .exec() at the end of the aggregation pipeline

      // Retrieve the product details for the best selling products
      const productIds = bestSellingProducts.map((product) =>
        product._id.toString()
      );

      const bestSellingProductDetails = await Product.find({
        _id: { $in: productIds },
      });

      return bestSellingProductDetails;
    } catch (error) {
      throw new Error("Unable to fetch best selling products.");
    }
  }

  async getTotalProductsCount(): Promise<number> {
    return await Product.countDocuments();
  }
}

export default ProductService;
