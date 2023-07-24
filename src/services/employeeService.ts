import Employee, { IEmployee } from "../models/employee";
import { getPhoto } from "../utils/getPhoto";

export async function createEmployee(
  employeeData: IEmployee
): Promise<IEmployee> {
  try {
    const photo = await getPhoto(employeeData.gender);
    const data = { ...employeeData, photo };
    const employee = new Employee(data);
    await employee.save();
    return employee;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function getAllEmployees(): Promise<IEmployee[]> {
  try {
    const employees = await Employee.find();
    return employees;
  } catch (error: any) {
    throw new Error("Error getting employees");
  }
}

export async function updateEmployee(
  id: string,
  data: Partial<IEmployee>
): Promise<IEmployee> {
  try {
    const employee = await Employee.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      throw new Error("Employee not found");
    }
    return employee;
  } catch (error: any) {
    throw new Error("Error updating employee");
  }
}

export async function deleteEmployee(id: string): Promise<string> {
  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      throw new Error("Employee not found");
    }
    return "Employee deleted successfully";
  } catch (error: any) {
    throw new Error("Error deleting employee");
  }
}
