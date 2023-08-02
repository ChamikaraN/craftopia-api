// routes/orderRoutes.ts
import express from "express";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController";
import authenticate from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", createOrder);
router.get("/", authenticate, getAllOrders);
router.get("/:id", authenticate, getOrderById);
router.put("/:id", authenticate, updateOrder);
router.delete("/:id", authenticate, deleteOrder);

export default router;
