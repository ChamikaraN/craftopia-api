// generateProducts.ts
import { faker } from "@faker-js/faker";
import Product from "../models/product";
import Category from "../models/category";

const NUM_PRODUCTS = 20;

async function generateProducts() {
  try {
    const categories = await Category.find();

    // Remove existing products (Optional: If you want to start with a clean collection)
    await Product.deleteMany({});

    // Generate and insert fake products
    for (let i = 0; i < NUM_PRODUCTS; i++) {
      const randomCategoryIndex = faker.number.int({
        min: 0,
        max: categories.length - 1,
      });

      const categoryId = categories[randomCategoryIndex]._id;

      const product = new Product({
        name: faker.commerce.productName(),
        description: faker.lorem.sentences(),
        price: faker.commerce.price(),
        category: categoryId,
        stock: faker.number.int({ min: 1, max: 100 }),
        images: [faker.image.url()],
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await product.save();
    }

    console.log(`Generated ${NUM_PRODUCTS} fake products successfully.`);
  } catch (error) {
    console.error("Error generating fake products:", error);
  }
}

export default generateProducts;
