import { Request, Response } from "express";
import {
  generateTokens as generateTokensService,
  refreshAccessToken as refreshAccessTokenService,
  authenticateUserService,
} from "../services/authService";
import logger from "../utils/logger";

export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { username, password } = req.body;
    logger.info(req.body);
    const { accessToken, refreshToken } = await authenticateUserService(
      username,
      password
    );
    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(401).json({ error: "Invalid credentials" });
  }
}

export function generateAccessToken(req: Request, res: Response): void {
  const { accessToken, refreshToken } = generateTokensService();
  res.json({ accessToken, refreshToken });
}

export async function refreshAccessToken(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { refreshToken } = req.body;
    const accessToken = await refreshAccessTokenService(refreshToken);
    res.json({ accessToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid refresh token" });
  }
}
