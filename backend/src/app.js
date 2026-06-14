// server ar intance create korlam

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import authRouter from "./routes/auth.route.js";
import postRouter from "./routes/post.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);
app.use("/api/users", authRouter);
app.use("/api/posts", postRouter);

export default app;
