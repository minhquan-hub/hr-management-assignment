import { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  userName: string;
  password: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  city: string;
  role: string;
  status: string;
  isDeleted: boolean;
}
