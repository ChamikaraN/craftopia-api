// routes/categoryRoutes.ts
import express from 'express';
import multer from 'multer';
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';
import authenticate from '../middleware/authMiddleware';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/**
 * @swagger
 * /api/v1/category:
 *   post:
 *     summary: Create a new category
 *     description: Create a new category with name, description, image, and status.
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               image:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Category created successfully.
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       500:
 *         description: Internal server error.
 */
router.post('/', upload.single('image'), authenticate, createCategory);

/**
 * @swagger
 * /api/v1/category:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve all categories.
 *     tags: [Category]
 *     responses:
 *       200:
 *         description: A list of categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       500:
 *         description: Internal server error.
 */
router.get('/', getAllCategories);

/**
 * @swagger
 * /api/v1/category/{id}:
 *   get:
 *     summary: Get a category by ID
 *     description: Retrieve a category by its ID.
 *     tags: [Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category to retrieve.
 *     responses:
 *       200:
 *         description: The category object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', getCategoryById);

/**
 * @swagger
 * /api/v1/category/{id}:
 *   put:
 *     summary: Update a category
 *     description: Update a category by its ID.
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: The updated category object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       400:
 *         description: Bad request. Invalid input data.
 *       401:
 *         description: Unauthorized. Authentication required.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
router.put('/:id', authenticate, updateCategory);

/**
 * @swagger
 * /api/v1/category/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Delete a category by its ID.
 *     tags: [Category]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the category to delete.
 *     responses:
 *       200:
 *         description: The deleted category object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized. Authentication required.
 *       404:
 *         description: Category not found.
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', authenticate, deleteCategory);

export default router;
