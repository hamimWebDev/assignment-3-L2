import httpStatus from "http-status";
import { TLoginUser } from "./LoginInterface";
import { AppError } from "../errors/AppErrors";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";

import { User } from "../User/UserSchemaModel";

const loginUser = async (payload: TLoginUser) => {
  const isUserExist = await User?.isUserExistByCustomEmail(payload?.email);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "user is fot found");
  }

  const isPasswordMashed = await User.isPasswordMashed(
    payload.password,
    isUserExist?.password as string,
  );

  if (isPasswordMashed === false) {
    throw new AppError(httpStatus.FORBIDDEN, "password do not match");
  }

  const jwtPayload = {
    userId: isUserExist?.id,
    role: isUserExist?.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "10d",
  });

  const refreshToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "365d",
  });

  const { _id, name, email, role, phone, address } = isUserExist;

  const user = { _id, name, email, role, phone, address };

  return {
    accessToken,
    refreshToken,
    user,
  };
};

const refreshToken = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(token, config.jwt_secret as string) as JwtPayload;

  const { userId } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistByCustomId(userId);
  
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user is not found !");
  }
  // checking if the user is already deleted
  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(httpStatus.FORBIDDEN, "This user is deleted !");
  }

  const jwtPayload = {
    userId: user.id,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, {
    expiresIn: "10d",
  });

  return {
    accessToken,
  };
};

export const LoginServices = {
  loginUser,
  refreshToken,
};
