// routes/productRoutes.ts
import express from 'express';
import multer from 'multer';
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../controllers/productController';
import authenticate from '../middleware/authMiddleware';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/', upload.single('image'), authenticate, createProduct);
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.put('/:id', upload.single('image'), authenticate, updateProduct);
router.delete('/:id', authenticate, deleteProduct);

export default router;
