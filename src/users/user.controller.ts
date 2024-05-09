import { Request, Response, NextFunction } from "express";
import { addUser, loginService, updateProfile, viewProfile } from "./user.service.js";
import { AuthRequest } from "../middleware/isAuth.js";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
   const authObj = await addUser(req.body);
    return res.status(201).json(
      authObj
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authObj = await loginService(req.body);
    return res.status(200).json(authObj);
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const profile = await viewProfile(req.userId as string);
    return res.status(200).json(profile);
  } catch (error) {
    next(error);
  }
};

export const editProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await updateProfile(req.userId as string,req.body);
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
};


