import { DataSource } from "typeorm";
// 1. Import all your entities directly
import { User } from "../entities/User.js";
import { Post } from "../entities/Post.js";
import { Like } from "../entities/Like.js";
import { Comments } from "../entities/Comment.js";

export const Database = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "root123",
  database: "socialMediaDb",
  logging: true,
  synchronize: true,
  // 2. Use the classes in the array instead of a string path
  entities: [User, Post, Like, Comments],
});
