import httpStatus from "http-status";
import config from "../../config";
import { AppError } from "../errors/AppErrors";
import TUser from "./UserInterface";
import jwt from "jsonwebtoken";
import { User } from "./UserSchemaModel";
import bcrypt from "bcrypt";

const postUserFromDb = async (userData: TUser) => {
  // Check if the user already exists by email
  const isUserExist = await User.isUserExistByCustomEmail(userData.email);
  if (isUserExist) {
    throw new AppError(httpStatus.CONFLICT, "User already exists");
  }

  // Hash the user's password
  const hashedPassword = await bcrypt.hash(
    userData.password,
    Number(config.bcrypt_salt_routs),
  );

  // Update the userData with the hashed password
  userData.password = hashedPassword;

  // Create the user in the database
  const result = await User.create(userData);

  // Generate JWT Payload
  const jwtPayload = {
    userId: result.id,
    role: result.role,
  };

  // Create JWT Token
  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "10d",
  });

  // Exclude password, createdAt, and updatedAt from the response
  const { password, createdAt, updatedAt, ...rest } = result.toObject();

  // Return the user data without sensitive information
  return { accessToken, rest };
};

const deleteUserFromDB = async (id: string) => {
  const requestUser = await User.findOne({ _id: id });
  if (requestUser?.isDeleted === true) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      "Failed this User is already deleted",
    );
  }
  const deletedUser = await User.findOneAndUpdate(
    { _id: id },
    { isDeleted: true },
    { new: true, runValidators: true },
  );

  if (!deletedUser) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete User");
  }

  return deletedUser;
};

const updateAUserIntoDB = async (id: string, payload: Partial<TUser>) => {
  const result = await User.findOneAndUpdate(
    { _id: id, isDeleted: false },
    payload,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const getAllUsers = async () => {
  const result = await User.find({ isDeleted: false });
  return result;
};

export const userServices = {
  postUserFromDb,
  updateAUserIntoDB,
  deleteUserFromDB,
  getAllUsers,
};
