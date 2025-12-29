import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from "typeorm";
import { User } from "./User.js";
import { Post } from "./Post.js";

@Entity("likes")
export class Like extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.likes, { onDelete: "CASCADE" })
  user!: User;

  @ManyToOne(() => Post, (post) => post.likes, { onDelete: "CASCADE" })
  post!: Post;
}
