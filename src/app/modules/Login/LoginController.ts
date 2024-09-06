import httpStatus from "http-status";
import { catchAsync } from "../Utils/CatchAsync";
import { LoginServices } from "./LoginService";
import { sendResponse } from "../Utils/SendResponse";
import { LoginValidation } from "./LoginValidation";
import config from "../../config";

const loginUser = catchAsync(async (req, res) => {
  const zodData = LoginValidation.loginValidationSchema.parse(req.body);
  const result = await LoginServices.loginUser(zodData);
  const { accessToken, refreshToken, user } = result;
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    token: accessToken,
    data: user,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await LoginServices.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Access token is retrieved succesfully!",
    data: result,
  });
});

export const LoginControllers = {
  loginUser,
  refreshToken,
};
