import { UserCreateDto } from "../dtos/user_create_dto";
import { IUser } from "../models/interface_model/user_interface_model";

export interface IUserService {
  addUser(userCreateDto: UserCreateDto): Promise<IUser>;
  updateUser(user: IUser): Promise<IUser>;
  deleteUser(user: IUser): Promise<IUser>;
}
