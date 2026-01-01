import "reflect-metadata";
import "dotenv/config";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

//API routes
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", likeRoutes);
app.use("/comments", commentRoutes);

export default app;
