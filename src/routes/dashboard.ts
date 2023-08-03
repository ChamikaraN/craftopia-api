// routes/productRoutes.ts
import express from 'express';
import {
  bestSellingProducts,
  status,
} from '../controllers/dashboardController';
import authenticate from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /api/v1/dashboard/status:
 *   get:
 *     summary: Get Dashboard Status
 *     description: Retrieve various statistics for the dashboard.
 *     tags: [Dashboard]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard statistics.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalCategories:
 *                   type: number
 *                   description: The total number of categories.
 *                 totalProducts:
 *                   type: number
 *                   description: The total number of products.
 *                 totalOrders:
 *                   type: number
 *                   description: The total number of orders.
 *                 totalRevenue:
 *                   type: number
 *                   description: The total revenue from all orders.
 *       500:
 *         description: Internal server error.
 */
router.get('/status', authenticate, status);

/**
 * @swagger
 * /api/v1/dashboard/bestSellingProducts:
 *   get:
 *     summary: Get Best Selling Products
 *     description: Retrieve the list of best selling products.
 *     tags: [Dashboard]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of best selling products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       404:
 *         description: No best selling products found.
 *       500:
 *         description: Internal server error.
 */
router.get('/bestSellingProducts', authenticate, bestSellingProducts);

export default router;
