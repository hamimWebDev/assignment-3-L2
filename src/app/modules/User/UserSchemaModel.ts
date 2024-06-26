/* eslint-disable no-unused-vars */
import { Document, Model, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import TUser from "./UserInterface";

interface IUser extends TUser, Document {}

interface IUserModel extends Model<IUser> {
  isUserExistByCustomEmail(email: string): Promise<IUser | null>;
  isPasswordMashed(password: string, hashPassword: string): Promise<boolean>;
  isJwtIssuedAfterPasswordChanged(
    passwordChangeTimeTamp: Date,
    jwtIssuedTime: number,
  ): boolean;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.isUserExistByCustomEmail = async function (email: string) {
  return await this.findOne({ email: email });
};

userSchema.statics.isPasswordMashed = async function (
  password: string,
  hashPassword: string,
) {
  return await bcrypt.compare(password, hashPassword);
};

export const User = model<IUser, IUserModel>("User", userSchema);
