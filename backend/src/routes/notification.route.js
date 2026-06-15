import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import * as notificationController from "../controllers/notification.controller.js";

const router = Router();

router.get("/", authMiddleware, notificationController.getNotifications);

router.get(
  "/unread-count",
  authMiddleware,
  notificationController.getUnreadNotificationCount,
);

router.patch(
  "/mark-all-read",
  authMiddleware,
  notificationController.markAllNotificationAsRead,
);

router.patch(
  "/:id/read",
  authMiddleware,
  notificationController.markSingleNotificationAsRead,
);

export default router;
