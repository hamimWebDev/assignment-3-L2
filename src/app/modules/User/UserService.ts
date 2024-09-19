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

  userData.password = hashedPassword;

  const result = await User.create(userData);

  const jwtPayload = {
    userId: result.id,
    role: result.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "10d",
  });

  const refreshToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "365d",
  });

  
  const { password, createdAt, updatedAt, ...rest } = result.toObject();

  return { accessToken, refreshToken, rest };
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

const getAUsers = async (id: string) => {
  const result = await User.findOne({ _id: id, isDeleted: false });
  return result;
};

export const userServices = {
  postUserFromDb,
  updateAUserIntoDB,
  deleteUserFromDB,
  getAllUsers,
  getAUsers,
};
