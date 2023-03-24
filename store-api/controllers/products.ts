import { Request, Response } from "express";

async function getAllProducts(req: Request, res: Response) {
  res.status(200).json({ msg: "getAllProducts" });
}

async function getAllStaticProducts(req: Request, res: Response) {
  res.status(200).json({ msg: "getAllStaticProducts" });
}

export { getAllProducts, getAllStaticProducts };
