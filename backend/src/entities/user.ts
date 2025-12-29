import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from "typeorm";
import { Post } from "./Post.js";
import { Like } from "./Like.js";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar" })
  name!: string;

  @Column({ type: "varchar", unique: true })
  email!: string;

  @Column({ type: "varchar" })
  password!: string;

  @OneToMany(() => Post, (post) => post.user)
  posts!: Post[];

  @OneToMany(() => Like, (likes) => likes.user)
  likes!: Like[];
}
