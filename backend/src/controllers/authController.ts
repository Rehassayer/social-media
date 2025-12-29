import { Request, Response } from "express";
import { Database } from "../config/db.js";
import { User } from "../entities/User.js";
import bcrypt from "bcrypt";
import { error } from "node:console";
import generateToken from "../utils/generateToken.js";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userRepo = Database.getRepository(User);

    const userExists = await userRepo.findOneBy({ email });

    if (userExists) {
      return res
        .status(400)
        .json({ message: "User already exists with the email" });
    }

    const newUser = userRepo.create({ name, email, password: hashedPassword });

    await userRepo.save(newUser);

    const token = generateToken(res, newUser.id);

    res.json({
      status: "success",
      token,
      data: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userRepo = Database.getRepository(User);

    const userExits = await userRepo.findOneBy({ email });

    if (!userExits) {
      return res.status(401).json({ error: "email or password invalid!" });
    }

    const isMatch = await bcrypt.compare(password, userExits.password);

    if (!isMatch) {
      return res.status(401).json({ error: "email or password invalid!" });
    }

    //Generate JWT token
    const token = generateToken(res, userExits.id);

    res.status(201).json({
      sucess: "Sucessfull login",
      token,
      data: {
        id: userExits.id,
        email: userExits.email,
      },
    });
  } catch (error) {
    console.log(error);
  }
};
