// generateCategories.ts
import { faker } from "@faker-js/faker";
import Category from "../models/category";

const NUM_CATEGORIES = 5;

async function generateCategories() {
  try {
    // Remove existing categories (Optional: If you want to start with a clean collection)
    await Category.deleteMany({});

    // Generate and insert fake categories
    const categories = [];
    for (let i = 0; i < NUM_CATEGORIES; i++) {
      const category = new Category({
        name: faker.commerce.department(),
        description: faker.lorem.sentences(),
        image: faker.image.url(),
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await category.save();
      categories.push(category._id);
    }

    console.log(`Generated ${NUM_CATEGORIES} fake categories successfully.`);
    return categories ?? [];
  } catch (error) {
    console.error("Error generating fake categories:", error);
  }
}

export default generateCategories;
