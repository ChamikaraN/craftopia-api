// generateOrders.ts
import { faker } from "@faker-js/faker";
import Order from "../models/order"; // Import your order model
import Product from "../models/product"; // Import your product model
import logger from "../utils/logger";

const NUM_ORDERS = 10; // Change this value to control the number of fake orders you want to create

async function generateOrders() {
  try {
    const products = await Product.find();

    // Remove existing orders (Optional: If you want to start with a clean collection)
    await Order.deleteMany({});

    // Generate and insert fake orders
    for (let i = 0; i < NUM_ORDERS; i++) {
      const orderProducts = [];

      // Generate random products for the order
      for (
        let j = 0;
        j < faker.number.int({ min: 1, max: products.length });
        j++
      ) {
        const randomProductIndex = faker.number.int({
          min: 0,
          max: products.length - 1,
        });
        const product = products[randomProductIndex];
        const quantity = faker.number.int({ min: 1, max: 5 }); // Random quantity for each product
        orderProducts.push({
          product: product._id,
          price: product.price,
          quantity,
        });
      }
      logger.info(orderProducts);
      const order = new Order({
        products: orderProducts,
        totalAmount: calculateTotalAmount(orderProducts),
        customerName: faker.person.fullName(),
        contactNumber: faker.phone.number(),
        shippingAddress: faker.location.streetAddress(true),
        status: faker.string.fromCharacters([
          "Pending",
          "Processing",
          "Delivered",
        ]), // You can set the initial status for the order here
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      await order.save();
    }

    console.log(`Generated ${NUM_ORDERS} fake orders successfully.`);
  } catch (error) {
    console.error("Error generating fake orders:", error);
  }
}

function calculateTotalAmount(
  orderProducts: { product: any; price: number; quantity: number }[]
) {
  // Calculate the total amount for the order based on the product prices and quantities
  let totalAmount = 0;
  if (orderProducts) {
    for (const orderProduct of orderProducts) {
      totalAmount += orderProduct.price * orderProduct.quantity;
    }
    return totalAmount;
  } else {
    return 0;
  }
}

export default generateOrders;
