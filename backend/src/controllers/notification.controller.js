import notificationModel from "../models/notification.model.js";

export async function getNotifications(req, res) {
  try {
    const notifications = await notificationModel
      .find({ receiver: req.user.id })
      .populate("sender", "username avatar")
      .populate("post", "caption image")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: notifications.length,
      notifications,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

export async function getUnreadNotificationCount(req, res) {
  try {
    const userId = req.user.id;

    const count = await notificationModel.countDocuments({
      receiver: userId,
      isRead: false,
    });

    return res.status(200).json({
      unReadCount: count,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

export async function markAllNotificationAsRead(req, res) {
  try {
    const userId = req.user.id;
    await notificationModel.updateMany(
      {
        receiver: userId,
        isRead: false,
      },
      {
        $set: {
          isRead: true,
        },
      },
    );

    return res.status(200).json({
      message: "all notifications marked as read",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}

export async function markSingleNotificationAsRead(req, res) {
  try {
    const { id } = req.params;

    await notificationModel.updateOne(
      {
        _id: id,
        receiver: req.user.id,
        isRead: false,
      },
      {
        $set: { isRead: true },
      },
    );

    return res.status(200).json({
      message: "notification mark as read",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
}
