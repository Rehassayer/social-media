import { Request, Response } from "express";
import { Database } from "../config/db.js";
import { Like as LikeEntity } from "../entities/Like.js";

export const toggleLike = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = (req as any).user;

    if (!userId || !postId) {
      return res.status(400).json({ error: "User ID or Post ID missing" });
    }

    const likeRepo = Database.getRepository(LikeEntity);

    //check if the like already exists (to "unlike")
    const existingLike = await likeRepo.findOne({
      where: {
        user: { id: Number(userId) },
        post: { id: Number(postId) },
      },
    });

    if (existingLike) {
      await likeRepo.remove(existingLike);
      return res.json({ message: "Post unliked" });
    }

    const newLike = likeRepo.create({
      user: { id: Number(userId) },
      post: { id: Number(postId) },
    });

    await likeRepo.save(newLike);
    res.status(201).json({ message: "Post Liked" });
  } catch (error) {
    console.error("DEBUG ERROR:", error); // LOOK AT YOUR TERMINAL FOR THIS
    res.status(500).json({ error: "server error" });
  }
};
