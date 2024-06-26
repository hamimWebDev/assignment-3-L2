import httpStatus from "http-status";
import { TLoginUser } from "./LoginInterface";
import { AppError } from "../Errors/AppErrors";
import jwt from "jsonwebtoken";
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

  const { _id, name, email, role, phone, address } = isUserExist;

  const user = { _id, name, email, role, phone, address };

  return {
    accessToken,
    user,
  };
};

export const LoginServices = {
  loginUser,
};
