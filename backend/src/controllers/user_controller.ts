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
    container.get<express.RequestHandler>("verifyAdminAndLeader")
  )
  async addUser(req: Request, res: Response) {
    try {
      const userCreateDto = req.body;
      const user = await this._userService.addUser(userCreateDto);
      logger.info(`Added User ${user}`);
      return res.status(StatusCodes.OK).json(user);
    } catch (error) {
      logger.error(`The error is at get method addUser: ${error}`);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something server error");
    }
  }

  @httpGet(
    "/",
    container.get<express.RequestHandler>("verifyLogin"),
    container.get<express.RequestHandler>("verifyAdminAndLeader")
  )
  async getAllUser(req: Request, res: Response) {
    try {
      const userList = await this._userService.getAllUser();
      logger.info(`Get All Users: ${userList}`);
      res.status(StatusCodes.OK).json(userList);
    } catch (error) {
      logger.error(`The error is at get method getAllUser: ${error}`);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something server error");
    }
  }

  @httpPut(
    "/:id",
    container.get<express.RequestHandler>("verifyLogin"),
    container.get<express.RequestHandler>("verifyAdminAndLeader")
  )
  async updateUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const userUpdateDto = req.body;
      const user = await this._userService.updateUser(id, userUpdateDto);
      logger.info(`Updated User: ${user}`);
      return res
        .status(StatusCodes.OK)
        .json({ message: "Updated User successfully", isSuccess: true });
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
    container.get<express.RequestHandler>("verifyAdminAndLeader")
  )
  async deleteUser(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const user = await this._userService.deleteUser(id);
      logger.info(`Deleted User: ${user}`);
      return res
        .status(StatusCodes.OK)
        .json({ message: "Deleted User successfully", isSuccess: true });
    } catch (error) {
      logger.error(`The error is at get method deleteUser: ${error}`);
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something server error");
    }
  }
}
