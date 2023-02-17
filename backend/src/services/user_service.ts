import { Status } from "./../ultils/enum/status_enum";
import { Role } from "./../ultils/enum/role_enum";
import bcrypt from "bcrypt";
import { injectable } from "inversify";
import { UserCreateDto } from "../dtos/user/user_create_dto";
import { UserDto } from "../dtos/user/user_dto";
import { IUserService } from "../interfaces/iuser_service";
import { IUser } from "../models/interface_model/user_interface_model";
import User from "../models/user_model";
import logger from "../ultils/logger";

@injectable()
class UserService implements IUserService {
  async addUser(userCreateDto: UserCreateDto): Promise<UserDto | undefined> {
    try {
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
      });

      const user = await newUser.save();
      const userDto: UserDto = {
        id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        age: user.age,
        gender: user.gender,
        phone: user.phone,
        email: user.email,
        city: user.city,
        role: user.role,
      };

      return userDto;
    } catch (error) {
      console.log("Error: " + error);
      logger.error(`The error is at addUser method of UserService: ${error}`);
    }
  }

  async getAllUser(): Promise<UserDto[] | undefined> {
    try {
      const userList = await User.find({
        isDeleted: false,
        status: "available",
        role: ["leader", "member"],
      }).exec();

      let userDtoList: UserDto[] = [];

      for (let user of userList) {
        const {
          _id,
          fullName,
          userName,
          age,
          gender,
          phone,
          email,
          city,
          role,
        } = user;

        userDtoList.push({
          id: _id,
          fullName: fullName,
          userName: userName,
          age: age,
          gender: gender,
          phone: phone,
          email: email,
          city: city,
          role: role,
        });
      }

      return userDtoList;
    } catch (error) {
      console.log("Error: " + error);
      logger.error(
        `The error is at getAllUser method of UserService: ${error}`
      );
    }
  }

  async getAllUserWithMemberRole(): Promise<UserDto[] | undefined> {
    try {
      const userList = await User.find({
        isDeleted: false,
        role: "member",
        status: Status.Available,
      }).exec();

      let userDtoList: UserDto[] = [];

      for (let user of userList) {
        const {
          _id,
          fullName,
          userName,
          age,
          gender,
          phone,
          email,
          city,
          role,
        } = user;

        userDtoList.push({
          id: _id,
          fullName: fullName,
          userName: userName,
          age: age,
          gender: gender,
          phone: phone,
          email: email,
          city: city,
          role: role,
        });
      }

      return userDtoList;
    } catch (error) {
      console.log("Error: " + error);
      logger.error(
        `The error is at getAllUserWithMemberRole method of UserService: ${error}`
      );
    }
  }

  async updateUser(id: string, user: IUser): Promise<IUser | undefined> {
    try {
      const option = { new: true };
      const userUpdate = await User.findByIdAndUpdate(id, user, option);
      if (userUpdate === null) {
        return undefined;
      }
      return userUpdate;
    } catch (error) {
      console.log("Error: " + error);
      logger.error(
        `The error is at updateUser method of UserService: ${error}`
      );
      return undefined;
    }
  }

  async deleteUser(id: string): Promise<IUser | undefined> {
    try {
      const option = { new: true };
      const userDelete = await User.findByIdAndUpdate(
        id,
        {
          $set: { isDeleted: true },
        },
        option
      );
      if (userDelete === null) {
        return undefined;
      }
      return userDelete;
    } catch (error) {
      console.log("Error: " + error);
      logger.error(
        `The error is at deleteUser method of UserService: ${error}`
      );
      return undefined;
    }
  }
}

export default UserService;
