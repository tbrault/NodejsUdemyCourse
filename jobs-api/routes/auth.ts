import express from "express";
const router = express.Router();
import validateAuthentication from "../middlewares/auth.js";

import { registerUser, logInUser } from "../controllers/auth.js";

router.post("/register", registerUser);
router.post("/login", validateAuthentication, logInUser);

export default router;
