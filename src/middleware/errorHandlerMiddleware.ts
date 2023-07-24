import { Request, Response, NextFunction } from "express";
import logger from "../utils/logger";

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);

  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  logger.error(message);
  res.status(statusCode).json({ error: message });
}

export default errorHandler;
