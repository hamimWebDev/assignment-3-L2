import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TUserRole } from "../User/UserInterface";
import { catchAsync } from "../Utils/CatchAsync";
import { AppError } from "../errors/AppErrors";
import config from "../../config";
import { User } from "../User/UserSchemaModel";

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    // Extract the bearer token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "Invalid authorization header. Bearer token expected.",
      );
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        "You are sending an invalid authorization token",
      );
    }

    try {
      const decoded = jwt.verify(
        token,
        config.jwt_secret as string,
      ) as JwtPayload;
      req.user = decoded;

      // Example usage of 'role'
      const { role, userId } = decoded;
      const user = await User?.isUserExistByCustomId(userId);
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, "User not found");
      }

      if (requiredRoles && !requiredRoles.includes(role as TUserRole)) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      } else {
        next();
      }
    } catch (error) {
      throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token");
    }
  });
};
