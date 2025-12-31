import "reflect-metadata";
import "dotenv/config";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//API routes
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", likeRoutes);

export default app;
