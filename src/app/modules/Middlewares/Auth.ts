import httpStatus from "http-status";
import { AppError } from "../errors/AppErrors";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { TUserRole } from "../User/UserInterface";
import { catchAsync } from "../Utils/CatchAsync";
import config from "../../config";
import { User } from "../User/UserSchemaModel";

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are sending an invalid authorization token",
      );
    }

    const decoded = jwt.verify(
      token,
      config.jwt_secret as string,
    ) as JwtPayload;
    req.user = decoded;

    // Example usage of 'role'
    const { role, userId } = decoded;

    const user = await User?.isUserExistByCustomId(userId);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, "user is fot found");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
    } else {
      next();
    }
  });
};
