// server ar intance create korlam

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import config from "./config/config.js";
import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";
import notificationRouter from "./routes/notification.route.js";
import userRouter from "./routes/users.route.js";
const app = express();

app.set("trust proxy", 1);
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://social-media-project-weld.vercel.app",
    ],
    credentials: true,
  }),
);

app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/notifications", notificationRouter);

export default app;
