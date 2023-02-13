import "reflect-metadata";
import { inject } from "inversify";
import {
  controller,
  httpPost,
  httpGet,
  httpPut,
} from "inversify-express-utils";
import { NextFunction, Response, Request, application } from "express";

@controller("/book")
export default class BookController {
  isConstructorDeclaration() {}

  @httpGet("")
  async getAllCategory(
    request: Request,
    response: Response,
    next: NextFunction
  ) {}
}
