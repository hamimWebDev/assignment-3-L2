import httpStatus from "http-status";
import config from "../../config";
import { AppError } from "../errors/AppErrors";
import TUser from "./UserInterface";
import jwt from "jsonwebtoken";
import { User } from "./UserSchemaModel";
import bcrypt from "bcrypt";

const postUserFromDb = async (userData: TUser) => {
  // Create the user in the database
  const result = await User.create(userData);
  const isUserExist = await User?.isUserExistByCustomEmail(userData?.email);

  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "user is fot found");
  }

  const jwtPayload = {
    userId: isUserExist?.id,
    role: isUserExist?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "10d",
  });

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_routs),
  );

  // Update the userData with the hashed password
  userData.password = hashedPassword;

  const { password, createdAt, updatedAt, ...rest } = result.toObject();

  // Return the user data without the password, createdAt, updatedAt
  return { accessToken, rest };
};

const getAllUsers = async () => {
  const result = await User.find();
  return result;
};

export const userServices = {
  postUserFromDb,
  getAllUsers,
};
