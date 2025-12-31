import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createComments,
  getPostComment,
  updateComment,
  deleteComment,
} from "../controllers/commentsController.js";

const router = express.Router();

router.post("/:postId", authMiddleware, createComments);
router.get("/:postId", getPostComment);
router.put("/:commentId", authMiddleware, updateComment);
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;
