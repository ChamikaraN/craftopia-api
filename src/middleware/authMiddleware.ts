import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (token == null) {
    res.sendStatus(401);
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err) => {
    if (err) {
      res.sendStatus(403);
      return;
    }
    next();
  });
};

export default authenticate;
