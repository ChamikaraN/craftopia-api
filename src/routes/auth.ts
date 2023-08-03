import express, { Router } from 'express';
import {
  login,
  generateAccessToken,
  refreshAccessToken,
} from '../controllers/authController';

const router: Router = express.Router();

/**
 * @swagger
 * /api/v1/auth:
 *   post:
 *     summary: Generate Access and Refresh Tokens
 *     tags: [Auth]
 *     description: Generates access and refresh tokens.
 *     requestBody:
 *       description: User credentials (username and password)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tokens generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 */
router.post('/', generateAccessToken);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login and get Access and Refresh Tokens
 *     tags: [Auth]
 *     description: Authenticate user with provided credentials and get access and refresh tokens.
 *     requestBody:
 *       description: User credentials (username and password)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tokens generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.post('/login', login);

/**
 * @swagger
 * /api/v1/auth/refresh-token:
 *   post:
 *     summary: Refresh Access Token
 *     tags: [Auth]
 *     description: Refresh the access token using the provided refresh token.
 *     requestBody:
 *       description: Refresh token
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: New access token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *       403:
 *         description: Invalid refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/refresh-token', refreshAccessToken);

export default router;
