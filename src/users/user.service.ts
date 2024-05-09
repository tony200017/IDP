import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { ILogin, IUser } from "./user.interface";
import User from "./user.model";
import { HTTPError } from "../errors/HTTPError";
import { errorMessages } from "./user.errorMessages";
import { authJwtSecret } from "../configs/config";
import mongoose from "mongoose";

export const addUser = async (userData: IUser) => {
  const checkUser = await userByEmail(userData.email);

  if (checkUser) {
    const error = new HTTPError(
      errorMessages.userAlreadyexist.message,
      errorMessages.userAlreadyexist.statusCode
    );
    throw error;
  }
  userData.password = await encryptPassword(userData.password);
  const user = new User(userData);
  await user.save();
  const token = await signJwtForUser(user._id.toString());
  return { token, userId: user._id.toString() };
};

export const loginService = async (loginData: ILogin) => {
  const { email, password } = loginData;
  const user = await userByEmail(email);
  if (!user) {
    const error = new HTTPError(
      errorMessages.notfound.message,
      errorMessages.notfound.statusCode
    );
    throw error;
  }
  const result = await checkPassword(password, user.password);
  if (!result) {
    const error = new HTTPError(
      errorMessages.wrongPassword.message,
      errorMessages.wrongPassword.statusCode
    );
    throw error;
  }
  const token = await signJwtForUser(user._id.toString());
  return { token, userId: user._id.toString() };
};

export const updateProfile = async (id: string, updateData: object) => {
  //await checkUser(id);
  return User.findByIdAndUpdate({ _id: id }, { $set: updateData });
};

export const viewProfile = async (id: string) => {
  //await checkUser(id);
  
  const profile = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(id) } },
    { $project: { _id: 1, password: 0, createdAt: 0, updatedAt: 0, __v: 0 } },
  ]);
  return profile[0];
};

const signJwtForUser = async (id: string) => {
  return jwt.sign({ userId: id }, authJwtSecret, { expiresIn: "1h" });
};

const userByEmail = async (email: String) => {
  const user = await User.findOne({ email: email });
  return user;
};

const encryptPassword = async (password: string) => {
  return bcrypt.hash(password, 12);
};
const checkPassword = async (password: string, hashPassword: string) => {
  return bcrypt.compare(password, hashPassword);
};

const checkUser = async (id: string) => {
  const user = await User.findById(id);
  if (!user) {
    const error = new HTTPError(
      errorMessages.notfound.message,
      errorMessages.notfound.statusCode
    );
    throw error;
  }
};
