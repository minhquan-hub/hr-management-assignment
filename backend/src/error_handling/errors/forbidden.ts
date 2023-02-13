import BaseError from "../base_error";
import { StatusCodes } from "http-status-codes";

class forbidden extends BaseError {
  constructor(
    name: string,
    httpCode = StatusCodes.FORBIDDEN,
    isOperational = true,
    description = "HTTP Error 403 – Forbidden"
  ) {
    super(name, httpCode, isOperational, description);
  }
}
