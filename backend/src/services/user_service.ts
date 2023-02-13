import bcrypt from "bcrypt";
import { injectable } from "inversify";
import { UserCreateDto } from "../dtos/user_create_dto";
import { IUserService } from "../interfaces/iuser_service";
import { IUser } from "../models/interface_model/user_interface_model";
import User from "../models/user_model";
import logger from "../ultils/logger";

@injectable()
class UserService implements IUserService {
  async addUser(userCreateDto: UserCreateDto): Promise<IUser> {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(userCreateDto.password, salt);
    const newUser = new User({
      fullName: userCreateDto.fullName,
      userName: userCreateDto.userName,
      password: hashed,
      age: userCreateDto.age,
      gender: userCreateDto.gender,
      phone: userCreateDto.phone,
      email: userCreateDto.email,
      city: userCreateDto.city,
      role: userCreateDto.role,
      status: userCreateDto.status,
      isDeleted: false,
    });

    const user = await newUser.save();
    return user;
  }
  updateUser(user: IUser): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
  deleteUser(user: IUser): Promise<IUser> {
    throw new Error("Method not implemented.");
  }
}

export default UserService;
