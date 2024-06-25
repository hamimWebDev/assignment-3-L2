import httpStatus from "http-status";
import { catchAsync } from "../Utils/CatchAsync";
import { sendResponse } from "../Utils/SendResponse";
import { userServices } from "./UserService";
import { userValidation } from "./UserValidation";

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const zodData = userValidation.userValidationSchema.parse(userData);

  const result = await userServices.postUserFromDb(zodData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Create user successfully",
    data: result,
  });
});

export const userControllers = {
  createUser,
};
