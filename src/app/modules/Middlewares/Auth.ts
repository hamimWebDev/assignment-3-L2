import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import { TUserRole } from "../User/UserInterface";
import { catchAsync } from "../Utils/CatchAsync";
import { AppError } from "../errors/AppErrors";
import config from "../../config";
import { User } from "../User/UserSchemaModel";

export const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
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
    const { role, _id } = decoded;

    const user = await User?.isUserExistByCustomId(_id);
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
