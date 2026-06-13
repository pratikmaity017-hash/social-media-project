// routes mane api create korlam 

import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.post("/logout",authController.logoutUser);

router.get("/user-data", authMiddleware, authController.getCurrentUser);

export default router;
