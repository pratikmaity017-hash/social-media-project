// routes mane api create korlam

import { Router } from "express";

import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.midddleware.js";
import * as userController from "../controllers/user.controller.js";

const router = Router();

router.get("/user-data", authMiddleware, userController.getCurrentUser);

router.post("/:id/follow", authMiddleware, userController.toggleFollow);

router.get("/search", authMiddleware, userController.searchUser);

router.get("/:id", authMiddleware, userController.getUserProfile);

router.patch("/profile", authMiddleware, userController.updateProfile);

router.post(
  "/avatar",
  authMiddleware,
  upload.single("avatar"),
  userController.uploadAvatar,
);

router.put("/save-post/:postId", authMiddleware, userController.savePost);

export default router;
