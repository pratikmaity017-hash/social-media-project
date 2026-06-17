import { useEffect, useState } from "react";
import api from "../api/axios";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  const getNotifications = async () => {
    try {
      const res = await api.get("/notifications");

      setNotifications(res.data.notifications);
    } catch (err) {
      console.log("ERROR:", err);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-5">Notifications</h1>
      {notifications.length === 0 ? (
        <p>No notifications yet</p>
      ) : (
        notifications.map((notifications) => (
          <div
            key={notifications._id}
            className="border p-4 rounded-lg mb-3 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <img
                src={notifications.sender?.avatar || "/default-avatar.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover"
              />

              <div>
                <p>
                  <strong>{notifications.sender?.username}</strong>{" "}
                  {notifications.type === "follow" && "followed you"}
                  {notifications.type === "like" && "liked your post"}
                  {notifications.type === "comment" && "commented on your post"}
                </p>
              </div>
            </div>
            {notifications.post?.image && (
              <img
                src={notifications.post.image}
                alt="post"
                className="w-12 h-12 rounded object-cover"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default Notifications;
