import { Request, Response } from "express";
import {
  generateTokens as generateTokensService,
  refreshAccessToken as refreshAccessTokenService,
} from "../services/authService";

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
