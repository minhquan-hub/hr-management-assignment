import { Status } from "./../ultils/enum/status_enum";
import { Gender } from "./../ultils/enum/gender_enum";
import { model, Schema, Model, Document } from "mongoose";
import { Role } from "../ultils/enum/role_enum";

import { IUser } from "./interface_model/user_interface_model";

const UserSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  userName: { type: String, required: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  gender: {
    type: String,
    enum: Gender,
    required: true,
  },
  phone: { type: String },
  email: { type: String, required: true },
  city: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, enum: Status, required: true },
  isDeleted: { type: Boolean, required: true, default: false },
});

const User = model<IUser>("User", UserSchema);
export default User;
