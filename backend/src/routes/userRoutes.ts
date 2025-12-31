import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createPost, getPost } from "../controllers/postController.js";

const router = express.Router();

router.post("/api/post", authMiddleware, createPost);
router.get("/api/post", authMiddleware, getPost);

export default router;
