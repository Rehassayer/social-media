import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createPost,
  getPost,
  updatePost,
} from "../controllers/postController.js";

const router = express.Router();

router.post("/api/post", authMiddleware, createPost);
router.get("/api/post", authMiddleware, getPost);
router.put("/api/:postId", authMiddleware, updatePost);

export default router;
