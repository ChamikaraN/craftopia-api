// routes/orderRoutes.ts
import express from 'express';
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from '../controllers/orderController';
import authenticate from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /api/v1/order:
 *   post:
 *     summary: Create a new order
 *     description: Create a new order with products, totalAmount, customerName, contactNumber, and shippingAddress.
 *     tags: [Order]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewOrder'
 *     responses:
 *       201:
 *         description: Order created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error.
 */
router.post('/', createOrder);

/**
 * @swagger
 * /api/v1/order:
 *   get:
 *     summary: Get all orders
 *     description: Retrieve all orders.
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       500:
 *         description: Internal server error.
 */
router.get('/', authenticate, getAllOrders);

/**
 * @swagger
 * /api/v1/order/{id}:
 *   get:
 *     summary: Get an order by ID
 *     description: Retrieve an order by its ID.
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to retrieve.
 *     responses:
 *       200:
 *         description: The order object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', authenticate, getOrderById);

/**
 * @swagger
 * /api/v1/order/{id}:
 *   put:
 *     summary: Update an order
 *     description: Update an order by its ID.
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateOrder'
 *     responses:
 *       200:
 *         description: The updated order object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/:id', authenticate, updateOrder);

/**
 * @swagger
 * /api/v1/order/{id}:
 *   delete:
 *     summary: Delete an order
 *     description: Delete an order by its ID.
 *     tags: [Order]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the order to delete.
 *     responses:
 *       200:
 *         description: The deleted order object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', authenticate, deleteOrder);

export default router;
