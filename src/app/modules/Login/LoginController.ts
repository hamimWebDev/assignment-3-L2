import httpStatus from "http-status";
import { catchAsync } from "../Utils/CatchAsync";
import { LoginServices } from "./LoginService";
import { sendResponse } from "../Utils/SendResponse";
import { LoginValidation } from "./LoginValidation";

const loginUser = catchAsync(async (req, res) => {
  const zodData = LoginValidation.loginValidationSchema.parse(req.body);
  const result = await LoginServices.loginUser(zodData);
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
