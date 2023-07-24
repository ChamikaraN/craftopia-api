import { Request, Response } from "express";

export function generateAccessToken(req: Request, res: Response): void;
export function refreshAccessToken(req: Request, res: Response): Promise<void>;
