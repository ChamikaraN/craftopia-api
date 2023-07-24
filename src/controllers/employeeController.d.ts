import { Request, Response } from "express";

export declare const createEmployee: (
  req: Request,
  res: Response
) => Promise<void>;
export declare const createEmployeeMiddleware: [
  (req: Request, res: Response) => void,
  (req: Request, res: Response) => Promise<void>
];
export declare const getAllEmployees: (
  req: Request,
  res: Response
) => Promise<void>;
export declare const updateEmployee: (
  req: Request,
  res: Response
) => Promise<void>;
export declare const updateEmployeeMiddleware: [
  (req: Request, res: Response) => void,
  (req: Request, res: Response) => Promise<void>
];
export declare const deleteEmployee: (
  req: Request,
  res: Response
) => Promise<void>;
