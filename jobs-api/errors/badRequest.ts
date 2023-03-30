import { StatusCodes } from "http-status-codes";
import CustomAPIError from "../errors/custom-errors.js";

class BadRequestError extends CustomAPIError {
  statusCode: number;
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export default BadRequestError;
