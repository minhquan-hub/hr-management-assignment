import { NextFunction, Response, Request } from "express";

export interface IBookService {
  getParams(): void;
}
