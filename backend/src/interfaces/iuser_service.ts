import { UserCreateDto } from "../dtos/user/user_create_dto";
import { UserDto } from "../dtos/user/user_dto";
import { IUser } from "../models/interface_model/user_interface_model";

export interface IUserService {
  addUser(userCreateDto: UserCreateDto): Promise<UserDto | undefined>;
  updateUser(id: string, user: IUser): Promise<IUser | undefined>;
  deleteUser(id: string): Promise<IUser | undefined>;
}
