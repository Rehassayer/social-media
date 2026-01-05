import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getProfile, updateProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/api/profile", authMiddleware, getProfile);
router.put("/api/:userId", authMiddleware, updateProfile);

export default router;
