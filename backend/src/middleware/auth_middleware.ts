import { NextFunction, Response, Request, application } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import User from "../models/user_model";
import { IUser } from "../models/interface_model/user_interface_model";

export function verifyLogin(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (token) {
    const accessToken = token.split(" ")[1];
    jwt.verify(
      accessToken,
      process.env.JWT_ACCESS_KEY as string,
      (err, decode) => {
        if (err) {
          return res.status(StatusCodes.FORBIDDEN).json("Token is not valid!");
        }
        req.body["user"] = decode;
        next();
      }
    );
  } else {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json("You're not authenticated!");
  }
}

export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  verifyLogin(req, res, async () => {
    const user: IUser | null = await User.findById(req.body["user"]["id"]);

    if (user?.role === "admin") {
      next();
    } else {
      return res.status(StatusCodes.FORBIDDEN).json("You're not allowed");
    }
  });
}

export function verifyLeader(req: Request, res: Response, next: NextFunction) {
  verifyLogin(req, res, async () => {
    const user: IUser | null = await User.findById(req.body["user"]["id"]);

    if (user?.role === "leader") {
      next();
    } else {
      return res.status(StatusCodes.FORBIDDEN).json("You're not allowed");
    }
  });
}

export function verifyAdminAndLeader(
  req: Request,
  res: Response,
  next: NextFunction
) {
  verifyLogin(req, res, async () => {
    const user: IUser | null = await User.findById(req.body["user"]["id"]);

    if (user?.role === "admin" || user?.role === "leader") {
      next();
    } else {
      return res.status(StatusCodes.FORBIDDEN).json("You're not allowed");
    }
  });
}
