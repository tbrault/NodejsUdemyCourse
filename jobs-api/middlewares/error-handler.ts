import CustomAPIError from "../errors/custom-errors.js";
import { StatusCodes } from "http-status-codes";
import { NextFunction, Request, Response } from "express";

function handleErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof CustomAPIError) {
    return res.json({ msg: err.message });
  }
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
}

export default handleErrors;
