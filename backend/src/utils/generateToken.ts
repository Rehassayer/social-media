import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (res: Response, userId: number) => {
  const JWT_SECRET_KEY = process.env.JWT_SECRET;

  const payload = { id: userId };
  const token = jwt.sign(
    payload,
    JWT_SECRET_KEY!,

    {
      expiresIn: "7d",
    }
  );

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, //7days
  });

  return token;
};

export default generateToken;
