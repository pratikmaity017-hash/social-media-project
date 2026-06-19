import { Router } from "express";
import * as postController from "../controllers/post.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.midddleware.js";

const router = Router();

router.post(
  "/createpost",
  authMiddleware,
  upload.single("image"),
  postController.createPost,
);

router.get("/", authMiddleware, postController.getAllPosts);

router.get("/feed", authMiddleware, postController.getFeed);

router.get("/:id", authMiddleware, postController.getPostById);

router.delete("/:id", authMiddleware, postController.deletePost);

router.post("/:id/like", authMiddleware, postController.toggleLike);

router.post("/:id/comment", authMiddleware, postController.addComment);

router.patch(
  "/:id",
  authMiddleware,
  upload.single("image"),
  postController.updatePost,
);

router.delete(
  "/:postId/comment/:commentId",
  authMiddleware,
  postController.deleteComment,
);

export default router;
