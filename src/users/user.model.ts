import mongoose from "mongoose";
import { tableNames } from "../configs/config";
import { IUser } from "./user.interface";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    dateOfBirth:Date
  },

  { timestamps: true }
);

userSchema.index({email:1});

export default mongoose.model<IUser>(tableNames.user, userSchema);