import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createPost,
  deletePost,
  getPost,
  updatePost,
} from "../controllers/postController.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/api/post", authMiddleware, upload.single("image"), createPost);
router.get("/api/post", authMiddleware, getPost);
router.put("/api/:postId", authMiddleware, updatePost);
router.delete("/api/:postId", authMiddleware, deletePost);

export default router;
