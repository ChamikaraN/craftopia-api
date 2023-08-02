import express, { Router } from "express";
import {
  login,
  generateAccessToken,
  refreshAccessToken,
} from "../controllers/authController";

const router: Router = express.Router();

router.post("/", generateAccessToken);
router.post("/login", login);
router.post("/refresh-token", refreshAccessToken);

export default router;
