import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import User from "../models/User.js";

async function registerUser(req: Request, res: Response, next: NextFunction) {
  const user = await User.create(req.body);
  const token = user.generateToken();
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

async function logInUser(req: Request, res: Response, next: NextFunction) {
  res.status(StatusCodes.OK).send("logInUser");
}

export { registerUser, logInUser };
