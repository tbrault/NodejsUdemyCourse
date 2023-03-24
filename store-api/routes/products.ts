import { Router } from "express";
const router = Router();

import {
  getAllProducts,
  getAllStaticProducts,
} from "../controllers/products.js";

router.route("/").get(getAllProducts);
router.route("/static").get(getAllStaticProducts);

export default router;
