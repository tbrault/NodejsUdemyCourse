import { Request } from "express";

interface CustomRequest extends Request {
  user?: {
    userId: number;
    name: string;
  };
}

export default CustomRequest;
