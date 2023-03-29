import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

async function registerUser(req: Request, res: Response, next: NextFunction) {
  res.status(StatusCodes.OK).send("registerUser");
}

async function logInUser(req: Request, res: Response, next: NextFunction) {
  res.status(StatusCodes.OK).send("logInUser");
}

export { registerUser, logInUser };
