import { IUserService } from "./../interfaces/iuser_service";
import { StatusCodes } from "http-status-codes";
import "reflect-metadata";
import { inject } from "inversify";
import {
  controller,
  httpPost,
  httpGet,
  httpPut,
  httpDelete,
} from "inversify-express-utils";
import { NextFunction, Response, Request, application } from "express";
import logger from "../ultils/logger";
import { TYPES } from "../config/types";

@controller("/user")
export default class UserController {
  private _userService: IUserService;

  constructor(@inject(TYPES.User) UserService: IUserService) {
    this._userService = UserService;
  }

  @httpPost("/")
  async addUser(req: Request, res: Response, next: NextFunction) {
    try {
      const userCreateDto = req.body;
      const user = await this._userService.addUser(userCreateDto);
      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      logger.error(`The error is at get method addUser: ${error}`);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something server error");
    }
  }

  @httpPut("/:id")
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const userUpdateDto = req.body;
      const user = await this._userService.updateUser(id, userUpdateDto);
      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      logger.error(`The error is at get method updateUser: ${error}`);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something server error");
    }
  }

  @httpDelete("/:id")
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const user = await this._userService.deleteUser(id);
      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      logger.error(`The error is at get method deleteUser: ${error}`);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something server error");
    }
  }
}
