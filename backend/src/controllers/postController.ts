import { Request, Response } from "express";
import { User } from "../entities/User.js";
import { Post } from "../entities/Post.js";
import { Database } from "../config/db.js";

export const createPost = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    const userId = req.user?.id;

    const userRepo = Database.getRepository(User);
    const postRepo = Database.getRepository(Post);

    const user = await userRepo.findOneBy({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPost = postRepo.create({
      content,
      user: user,
    });

    await postRepo.save(newPost);
    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

export const getPost = async (req: Request, res: Response) => {
  try {
    const postRepo = Database.getRepository(Post);

    const currentUserId = req.user?.id;

    const posts = await postRepo.find({
      relations: ["user", "likes", "likes.user", "comments", "comments.user"],
      select: {
        user: {
          id: true,
          name: true,
          email: true,
        },
      },
      order: { createdAt: "DESC" },
    });

    const postWithStatus = posts.map((post) => {
      return {
        ...post,
        //check if current user's id exists in the relation
        isLikedByUser: post.likes.some(
          (like) => like.user.id === Number(currentUserId)
        ),
        _count: {
          likes: post.likes.length,
          comment: post.comments.length,
        },
      };
    });

    if (!posts || posts.length === 0) {
      res.status(200).json([]);
    }
    res.status(200).json(postWithStatus);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};

export const updatePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user?.id;

    const postRepo = Database.getRepository(Post);

    const post = await postRepo.findOne({
      where: { id: Number(postId) },
      relations: ["user"],
    });

    if (!post) {
      return res.status(404).json({ message: "Post is not found" });
    }

    if (post.user.id !== userId) {
      return res
        .status(403)
        .json({ message: "You can only update your own post" });
    }

    post.content = content;
    await postRepo.save(post);

    res.status(200).json({ message: "Post updated sucessfully ! " });
  } catch (error) {
    res.status(500).json({ message: "error updating posts! ", error });
  }
};

export const deletePost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const userId = req.user?.id;

    const postRepo = Database.getRepository(Post);

    //find the post and its owner

    const post = await postRepo.findOne({
      where: { id: Number(postId) },
      relations: ["user"],
    });

    if (!post) {
      return res.status(404).json({ message: "Post is not found !" });
    }

    //security check : only owner can delete it

    if (post.user.id !== userId) {
      return res.status(403).json({
        message: "you are not authorized to delete this post!",
      });
    }

    //delete post
    await postRepo.remove(post);
    res.status(200).json({ message: " Post is deleted sucessfully !" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post!", error });
  }
};
