// routes mane api create korlam 

import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", authController.registerUser);

export default router;
