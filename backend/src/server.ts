import "reflect-metadata";
import "dotenv/config";
import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import likeRoutes from "./routes/likeRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: "http://localhost:3000", // The exact URL of your frontend
    credentials: true, // Allows cookies/headers to pass
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allow these methods
    allowedHeaders: ["Content-Type", "Authorization"], // Allow these headers
  })
);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//API routes
app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/", likeRoutes);
app.use("/comments", commentRoutes);
app.use("/api", profileRoutes);

export default app;
