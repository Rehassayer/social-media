import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getProfile, updateProfile } from "../controllers/userController.js";

const router = express.Router();

router.get("/user/profile", authMiddleware, getProfile);
router.put("/user/profile", authMiddleware, updateProfile);

export default router;
