import BaseError from "../base_error";
import { StatusCodes } from "http-status-codes";

class Unauthorized extends BaseError {
  constructor(
    name: string,
    httpCode = StatusCodes.UNAUTHORIZED,
    isOperational = true,
    description = "HTTP Error 401 - Unauthorized"
  ) {
    super(name, httpCode, isOperational, description);
  }
}

export default Unauthorized;
