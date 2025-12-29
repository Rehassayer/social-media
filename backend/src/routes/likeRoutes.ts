import express from "express";
import { toggleLike } from "../controllers/likeController.js";

const router = express.Router();

router.post("/newlike", toggleLike);

export default router;
