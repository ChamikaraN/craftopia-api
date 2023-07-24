import express, { Router } from "express";
import {
  generateAccessToken,
  refreshAccessToken,
} from "../controllers/authController";

const router: Router = express.Router();

router.post("/", generateAccessToken);
router.post("/refresh-token", refreshAccessToken);

export default router;
