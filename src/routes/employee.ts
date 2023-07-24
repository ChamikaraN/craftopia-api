import express, { Router } from "express";
import {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController";
import authenticateToken from "../middleware/authMiddleware";
import { employeeSchema } from "../validators/employeeValidation";
import { validateRequest } from "../middleware/employeeValidationMiddleware.ts";

const router: Router = express.Router();

/**
 * @swagger
 * definitions:
 *   Employee:
 *     type: object
 *     properties:
 *       _id:
 *         type: string
 *       first_name:
 *         type: string
 *         minLength: 6
 *         maxLength: 10
 *         pattern: "^[a-zA-Z]*$"
 *       last_name:
 *         type: string
 *         minLength: 6
 *         maxLength: 10
 *         pattern: "^[a-zA-Z]*$"
 *       email:
 *         type: string
 *         format: email
 *       number:
 *         type: string
 *         pattern: "^\\+94\\d{9}$"
 *       gender:
 *         type: string
 *         enum:
 *           - M
 *           - F
 *       photo:
 *         type: string
 *     required:
 *       - first_name
 *       - last_name
 *       - email
 *       - number
 *       - gender
 *   Error:
 *     type: object
 *     properties:
 *       message:
 *         type: string
 *     required:
 *       - message
 */

// Route for creating an employee
/**
 * @swagger
 * /api/v1/employee:
 *   post:
 *     summary: Create a new employee
 *     description: Creates a new employee with the given details.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: first_name
 *         description: First name of the employee.
 *         in: formData
 *         required: true
 *         type: string
 *         minLength: 6
 *         maxLength: 10
 *         pattern: ^[a-zA-Z]+$
 *       - name: last_name
 *         description: Last name of the employee.
 *         in: formData
 *         required: true
 *         type: string
 *         minLength: 6
 *         maxLength: 10
 *         pattern: ^[a-zA-Z]+$
 *       - name: email
 *         description: Email address of the employee.
 *         in: formData
 *         required: true
 *         type: string
 *         format: email
 *       - name: number
 *         description: Phone number of the employee.
 *         in: formData
 *         required: true
 *         type: string
 *         pattern: ^\+94\d{9}$
 *       - name: gender
 *         description: Gender of the employee.
 *         in: formData
 *         required: true
 *         type: string
 *         enum: [M, F]
 *     responses:
 *       201:
 *         description: Employee created successfully.
 *         schema:
 *           $ref: '#/definitions/Employee'
 *       400:
 *         description: Invalid request data.
 *         schema:
 *           $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 */

router.post(
  "/",
  authenticateToken,
  validateRequest(employeeSchema),
  createEmployee
);

// Route for getting all employees
/**
 * @swagger
 * /api/v1/employee:
 *   get:
 *     summary: Get all employees
 *     description: Returns a list of all employees.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A list of employees.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Employee'
 *       500:
 *         description: Internal server error.
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.get("/", authenticateToken, getAllEmployees);

// Route for updating an employee by ID
/**
 * @swagger
 * /api/v1/employee/{id}:
 *   put:
 *     summary: Update an employee by ID
 *     description: Update an employee by providing their ID and updated data.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the employee to update
 *         required: true
 *         type: string
 *       - name: updateEmployee
 *         in: body
 *         description: Updated employee object
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             first_name:
 *               type: string
 *               minLength: 6
 *               maxLength: 10
 *               pattern: '^[A-Za-z]+$'
 *             last_name:
 *               type: string
 *               minLength: 6
 *               maxLength: 10
 *               pattern: '^[A-Za-z]+$'
 *             email:
 *               type: string
 *               format: email
 *             number:
 *               type: string
 *               pattern: '^\+94\d{9}$'
 *             gender:
 *               type: string
 *               enum: [M, F]
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *         schema:
 *           $ref: '#/definitions/Employee'
 *       400:
 *         description: Invalid input data
 *         schema:
 *           $ref: '#/definitions/Error'
 *       404:
 *         description: Employee not found
 *         schema:
 *           $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/Error'
 */
router.put(
  "/:id",
  authenticateToken,
  validateRequest(employeeSchema),
  updateEmployee
);

// Route for deleting an employee by ID
/**
 * @swagger
 * /api/v1/employee/{id}:
 *   delete:
 *     summary: Delete an employee by ID
 *     description: Deletes an employee with the specified ID.
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the employee to delete
 *         required: true
 *         schema:
 *           type: string
 *           format: objectId
 *     responses:
 *       200:
 *         description: Employee successfully deleted
 *       404:
 *         description: Employee not found
 *         schema:
 *           $ref: '#/definitions/Error'
 *       500:
 *         description: Internal server error
 *         schema:
 *           $ref: '#/definitions/Error'
 */

router.delete("/:id", authenticateToken, deleteEmployee);

export default router;
