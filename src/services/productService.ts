// services/productService.ts
import Order from '../models/order';
import Product, { IProduct } from '../models/product';

export async function createProduct(product: any): Promise<IProduct> {
  const newProduct = new Product({
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    stock: product.stock,
    image: product.image,
    status: product.status,
    noOfSales: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  return await newProduct.save();
}

export async function getAllProducts(): Promise<IProduct[]> {
  return await Product.find().sort({ createdAt: -1 });
}

export async function getProductById(id: string): Promise<IProduct | null> {
  return await Product.findById(id);
}

export async function updateProduct(
  id: string,
  product: IProduct,
): Promise<IProduct | null> {
  return await Product.findByIdAndUpdate(
    id,
    {
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
      stock: product.stock,
      image: product.image,
      status: product.status,
      updatedAt: new Date(),
    },
    { new: true },
  );
}

export async function deleteProduct(id: string): Promise<IProduct | null> {
  return await Product.findByIdAndDelete(id);
}

export async function updateProductStatus(
  id: string,
): Promise<IProduct | null> {
  const product = await Product.findById(id);

  if (!product) {
    throw new Error(`Product not found with ID: ${id}`);
  }

  product.status = !product.status;
  return await product.save();
}

export async function getBestSellingProducts(): Promise<IProduct[]> {
  try {
    // Group and sum sales quantities for each product across all orders
    const bestSellingProducts = await Order.aggregate([
      { $unwind: '$products' },
      {
        $group: {
          _id: '$products.product',
          totalSalesQuantity: { $sum: '$products.salesQuantity' },
        },
      },
      { $sort: { totalSalesQuantity: -1 } },
      { $limit: 5 }, // Limit the results to the top 5 products
    ]).exec();

    // Retrieve the product details for the best selling products
    const productIds = bestSellingProducts.map((product) =>
      product._id.toString(),
    );

    const bestSellingProductDetails = await Product.find({
      _id: { $in: productIds },
    });

    if (!bestSellingProductDetails) {
      throw new Error('No best selling products found.');
    }

    return bestSellingProductDetails;
  } catch (error) {
    console.error('Error fetching best selling products:', error);
    throw new Error('Unable to fetch best selling products.');
  }
}

export async function getTotalProductsCount(): Promise<number> {
  return await Product.countDocuments();
}
