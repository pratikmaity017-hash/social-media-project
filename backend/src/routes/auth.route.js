// routes mane api create korlam

import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.midddleware.js";

const router = Router();

router.post("/register", authController.registerUser);

router.post("/login", authController.loginUser);

router.post("/logout", authController.logoutUser);

router.get("/user-data", authMiddleware, authController.getCurrentUser);

router.post("/:id/follow", authMiddleware, authController.toggleFollow);

router.get("/search", authMiddleware, authController.searchUser);

router.get("/:id", authMiddleware, authController.getUserProfile);

router.patch("/profile", authMiddleware, authController.updateProfile);

router.post(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  authController.uploadAvatar,
);

router.put("/save-post/:postId", authMiddleware, authController.savePost);

export default router;
