import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import CustomRequest from "../interfaces/CustomRequest.js";
import Job from "../models/Job.js";
import BadRequestError from "../errors/badRequest.js";

async function getAllJobs(req: CustomRequest, res: Response) {
  if (!req.user) {
    throw new BadRequestError("No user provided");
  }
  const jobs = await Job.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json({ jobs });
}

async function createSingleJob(req: CustomRequest, res: Response) {
  if (!req.user) {
    throw new BadRequestError("No user provided");
  }
  const job = await Job.create({
    ...req.body,
    createdBy: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({ job });
}

async function getSingleJob(req: Request, res: Response) {
  res.status(StatusCodes.OK).send("getSingleJob");
}

async function deleteSingleJob(req: Request, res: Response) {
  res.status(StatusCodes.OK).send("deleteSingleJob");
}

async function updateSingleJob(req: Request, res: Response) {
  res.status(StatusCodes.OK).send("updateSingleJob");
}

export {
  getAllJobs,
  createSingleJob,
  getSingleJob,
  deleteSingleJob,
  updateSingleJob,
};
