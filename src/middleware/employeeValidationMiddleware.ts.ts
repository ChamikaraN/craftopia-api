import { Schema, ZodError, ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";

/**
 * Middleware to validate request data using Zod schema.
 * @param schema - Zod schema for request validation.
 */
export function validateRequest(schema: ZodSchema<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Validate the request body, query parameters, or any other data.
      await schema.parseAsync(req.body);

      // If validation passes, move to the next middleware.
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        // Zod validation error occurred
        res.status(400).json({ message: error.message });
      } else {
        // Other error occurred
        res.status(500).json({ message: "Internal server error" });
      }
    }
  };
}
