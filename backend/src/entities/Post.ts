import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { User } from "./User.js";
import { Like } from "./Like.js";
import { Comments } from "./Comment.js";

@Entity("post")
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  content!: string;

  @Column({ type: "varchar", nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => User, (user) => user.posts)
  user!: User;

  @OneToMany(() => Like, (likes) => likes.post)
  likes!: Like[];

  @OneToMany(() => Comments, (comments) => comments.post)
  comments!: Comments[];
}
