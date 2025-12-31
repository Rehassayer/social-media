import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { toggleLike } from "../controllers/likeController.js";

const router = express.Router();

router.post("/newlike", authMiddleware, toggleLike);

export default router;
