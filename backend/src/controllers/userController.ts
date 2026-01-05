import { Database } from "../config/db.js";
import { User } from "../entities/User.js";
import { Request, Response } from "express";

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userRepo = Database.getRepository(User);
    const user = await userRepo.findOneBy({ id: req.user?.id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    res.status(500).json({ message: "server error", err });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userRepo = Database.getRepository(User);
    const user = await userRepo.findOneBy({ id: req.user?.id });

    if (!user) return res.status(404).json({ message: "User Not found! " });

    //update only the fields provided
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    await userRepo.save(user);

    res.json({
      message: "Profile updated sucessfully!",
      data: { name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: "Updated failed!" });
  }
};
