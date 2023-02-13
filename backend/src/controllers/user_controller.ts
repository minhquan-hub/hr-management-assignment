import { IUserService } from "./../interfaces/iuser_service";
import { StatusCodes } from "http-status-codes";
import "reflect-metadata";
import { inject } from "inversify";
import {
  controller,
  httpPost,
  httpGet,
  httpPut,
} from "inversify-express-utils";
import { NextFunction, Response, Request, application } from "express";
import logger from "../ultils/logger";
import UserService from "../services/user_service";
import { TYPES } from "../config/types";

@controller("/user")
export default class UserController {
  private _userService: IUserService;

  constructor(@inject(TYPES.User) UserService: IUserService) {
    this._userService = UserService;
  }

  @httpPost("")
  async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userCreateDto = req.body;
      const user = await this._userService.addUser(userCreateDto);
      return res.status(StatusCodes.OK).json(user);
    } catch (err) {
      logger.error(`The error is at get method addUser: ${err}`);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something server error");
    }
  }
}
