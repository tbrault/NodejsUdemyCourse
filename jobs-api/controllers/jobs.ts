import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

async function getAllJobs(req: Request, res: Response, next: NextFunction) {
  res.status(StatusCodes.OK).send("getAllJobs");
}

async function createSingleJob(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(StatusCodes.OK).send("createSingleJob");
}

async function getSingleJob(req: Request, res: Response, next: NextFunction) {
  res.status(StatusCodes.OK).send("getSingleJob");
}

async function deleteSingleJob(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(StatusCodes.OK).send("deleteSingleJob");
}

async function updateSingleJob(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(StatusCodes.OK).send("updateSingleJob");
}

export {
  getAllJobs,
  createSingleJob,
  getSingleJob,
  deleteSingleJob,
  updateSingleJob,
};
