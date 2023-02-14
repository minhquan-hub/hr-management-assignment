import { UserCreateDto } from "../dtos/user/user_create_dto";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { injectable } from "inversify";
import { IAuthService } from "../interfaces/iauth_service";
import { AuthDto } from "../dtos/auth/auth_dto";
import { IUser } from "../models/interface_model/user_interface_model";
import User from "../models/user_model";
import logger from "../ultils/logger";
import { LoginRequestDto } from "../dtos/auth/login_request_dto";

@injectable()
export default class AuthService implements IAuthService {
  constructor() {}
  generateAccessToken(user: IUser): string | undefined {
    try {
      return jwt.sign(
        {
          id: user._id,
          userName: user.userName,
        },
        process.env.JWT_ACCESS_KEY as string,
        {
          expiresIn: "20m",
        }
      );
    } catch (error) {
      console.error("Error: " + error);
      logger.error(
        `The error is at generateAccessToken method of AuthService: ${error}`
      );
    }
  }

  async loginUser(
    loginRequestDto: LoginRequestDto
  ): Promise<AuthDto | undefined> {
    try {
      let authDto: AuthDto = {
        userName: "",
        role: "",
        token: "",
        isSuccess: false,
      };

      const user = await User.findOne({ userName: loginRequestDto.userName });
      if (!user) return authDto;

      const validPassword = await bcrypt
        .compare(loginRequestDto.password, user.password)
        .then((valid) => {
          return valid;
        })
        .catch((error) => {
          console.error("Error: " + error);
          logger.error(
            `The error is at validPassword of AuthService: ${error}`
          );
        });

      if (user && validPassword) {
        const token = this.generateAccessToken(user);

        authDto = {
          userName: user.userName,
          role: user.role,
          token: token,
          isSuccess: true,
        };
        return authDto;
      }
    } catch (error) {
      console.error("Error: " + error);
      logger.error(`The error is at loginUser method of AuthService: ${error}`);
    }
  }
}
