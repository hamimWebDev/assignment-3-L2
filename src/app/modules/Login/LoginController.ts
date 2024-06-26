import httpStatus from "http-status";
import { catchAsync } from "../Utils/CatchAsync";
import { LoginServices } from "./LoginService";
import { sendResponse } from "../Utils/SendResponse";

const loginUser = catchAsync(async (req, res) => {
  const result = await LoginServices.loginUser(req.body);
  const { accessToken, user } = result;

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User logged in successfully",
    token: accessToken,
    data: user,
  });
});

export const LoginControllers = {
  loginUser,
};
