import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

//define the shape of the jwtPayLoad
interface jwtPayLoad {
  id: number;
}

//Read the token from  the request
//check if the token is valid
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Auth middleware is reached");
  let token: string;

  //get the token from cookies
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwtPayLoad;

      //Attach the userID to the request object
      (req as any).user = decoded.id;

      next();
    } catch (error) {
      res.status(401).json({ message: "Not Authorized, token failed" });
    }
  } else {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
