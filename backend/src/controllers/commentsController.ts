import { Request, Response } from "express";
import { Post } from "../entities/Post.js";
import { Database } from "../config/db.js";
import { Comments } from "../entities/Comment.js";

export const createComments = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;
    const userId = (req as any).user; // Extracted from middleware

    const postRepo = Database.getRepository(Post);
    const commentRepo = Database.getRepository(Comments);

    //verify the post exits
    const post = await postRepo.findOneBy({ id: Number(postId) });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    //Create and link the comment
    const newComment = commentRepo.create({
      content,
      user: { id: userId },
      post: { id: Number(postId) },
    });

    await commentRepo.save(newComment);

    res.status(201).json({
      message: "Comments added sucessfully",
      comment: newComment,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating comment", error });
  }
};

export const getPostComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const commentRepo = Database.getRepository(Comments);

    const comment = await commentRepo.find({
      where: { post: { id: Number(postId) } },
      relations: ["user"],
      order: { createdAt: "ASC" },
    });

    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments", error });
  }
};

//update comments section

export const updateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = (req as any).user;

    const commentRepo = Database.getRepository(Comments);

    const comment = await commentRepo.findOne({
      where: { id: Number(commentId) },
      relations: ["user"],
    });

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    if (comment.user.id !== userId) {
      return res
        .status(403)
        .json({ message: "You can only update your own comments" });
    }

    comment.content = content;
    await commentRepo.save(comment);

    res.status(200).json({ message: "Comment Updated sucessfully!" });
  } catch (error) {
    res.status(500).json({ message: "error updating comments!", error });
  }
};
