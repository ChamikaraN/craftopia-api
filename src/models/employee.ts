import mongoose, { Document, Model, Schema } from "mongoose";

export interface IEmployee extends Document {
  first_name: string;
  last_name: string;
  email: string;
  number: string;
  gender: string;
  photo: string;
}

const employeeSchema: Schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
});

const Employee: Model<IEmployee> = mongoose.model<IEmployee>(
  "Employee",
  employeeSchema
);

export default Employee;
