import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import logger from "../utils/logger";

// Controller function for creating a new employee
export const createEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employee = await employeeService.createEmployee(req.body);
    res.status(201).send(employee);
  } catch (error: any) {
    logger.error(error.message);
    res.status(400).send(error.message);
  }
};

// Controller function for getting all employees
export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await employeeService.getAllEmployees();
    res.status(200).send(employees);
  } catch (error: any) {
    logger.error(error.message);
    res.status(500).send(error.message);
  }
};

// Controller function for updating an employee by ID
export const updateEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const employee = await employeeService.updateEmployee(
      req.params.id,
      req.body
    );
    res.status(200).send(employee);
  } catch (error: any) {
    logger.error(error.message);
    res.status(400).send(error.message);
  }
};

// Controller function for deleting an employee by ID
export const deleteEmployee = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await employeeService.deleteEmployee(req.params.id);
    res.status(200).send("Employee deleted successfully");
  } catch (error: any) {
    logger.error(error.message);
    res.status(500).send(error.message);
  }
};
