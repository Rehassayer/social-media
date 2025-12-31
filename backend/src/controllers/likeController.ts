import { Request, Response } from "express";
import { Database } from "../config/db.js";
import { Like } from "typeorm";

export const toggleLike = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = (req as any).user;

    const likeRepo = Database.getRepository(Like);

    //check if the like already exists (to "unlike")
    const existingLike = await likeRepo.findOneBy({
      user: { id: Number(userId) },
      post: { id: Number(postId) },
    });

    if (existingLike) {
      await likeRepo.remove(existingLike);
      return res.json({ message: "Post unliked" });
    }

    const newLike = likeRepo.create({
      user: { id: userId },
      post: { id: postId },
    });

    await likeRepo.save(newLike);
    res.status(201).json({ message: "Post Liked" });
  } catch (error) {
    res.status(500).json({ error: "server error" });
  }
};
