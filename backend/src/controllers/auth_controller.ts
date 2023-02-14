import "reflect-metadata";
import { StatusCodes } from "http-status-codes";
import { NextFunction, Response, Request, application } from "express";
import {
  controller,
  httpPost,
  httpGet,
  httpPut,
  httpDelete,
} from "inversify-express-utils";
import AuthService from "../services/auth_service";
import { IAuthService } from "../interfaces/iauth_service";
import { inject } from "inversify";
import { TYPES } from "../config/types";
import logger from "../ultils/logger";

@controller("/auth")
export default class Authcontroller {
  private _authService: IAuthService;

  constructor(@inject(TYPES.Auth) AuthService: IAuthService) {
    this._authService = AuthService;
  }

  @httpPost("/")
  async loginUser(req: Request, res: Response, next: NextFunction) {
    try {
      const loginRequestDto = req.body;
      return res
        .status(StatusCodes.OK)
        .json(await this._authService.loginUser(loginRequestDto));
    } catch (error) {
      logger.error(
        `The error is at loginUser method of AuthController: ${error}`
      );
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json("Something server error");
    }
  }
}
