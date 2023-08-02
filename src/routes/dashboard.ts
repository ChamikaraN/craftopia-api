// routes/productRoutes.ts
import express from "express";
import {
  bestSellingProducts,
  status,
} from "../controllers/dashboardController";
import authenticate from "../middleware/authMiddleware";

const router = express.Router();

router.get("/status", authenticate, status);
router.get("/bestSellingProducts", authenticate, bestSellingProducts);

export default router;
