import BaseError from "../base_error";
import { StatusCodes } from "http-status-codes";

class BadRequestError extends BaseError {
  constructor(description = "bad request") {
    super("NOT FOUND", StatusCodes.BAD_REQUEST, true, description);
  }
}

export default BadRequestError;
