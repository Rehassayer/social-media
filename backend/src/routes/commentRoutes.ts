import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createComments } from "../controllers/commentsController.js";

const router = express.Router();

router.post("/newcomment/:postId", authMiddleware, createComments);

export default router;
