import { IUserService } from "./../interfaces/iuser_service";
import { StatusCodes } from "http-status-codes";
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
import container from "../config/inversify.config";
import express from "express";

@controller("/user")
export default class UserController {
  private _userService: IUserService;

  constructor(@inject(TYPES.User) UserService: IUserService) {
    this._userService = UserService;
  }

  @httpPost(
    "/",
    container.get<express.RequestHandler>("verifyLogin"),
    container.get<express.RequestHandler>("verifyAdmin"),
    container.get<express.RequestHandler>("verifyLeader")
  )
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

  @httpPut(
    "/:id",
    container.get<express.RequestHandler>("verifyLogin"),
    container.get<express.RequestHandler>("verifyAdmin"),
    container.get<express.RequestHandler>("verifyLeader")
  )
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

  @httpDelete(
    "/:id",
    container.get<express.RequestHandler>("verifyLogin"),
    container.get<express.RequestHandler>("verifyAdmin"),
    container.get<express.RequestHandler>("verifyLeader")
  )
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
