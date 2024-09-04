import httpStatus from "http-status";
import { catchAsync } from "../Utils/CatchAsync";
import { sendResponse } from "../Utils/SendResponse";
import { userServices } from "./UserService";
import { userValidation } from "./UserValidation";

const createUser = catchAsync(async (req, res) => {
  const userData = req.body;

  const zodData = userValidation.userValidationSchema.parse(userData);

  const { accessToken, rest } = await userServices.postUserFromDb(zodData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    token: accessToken,
    data: rest,
  });
});

const updateAUserIntoDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await userServices.updateAUserIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faculty is updated successfully",
    data: result,
  });
});

const deleteUserFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await userServices.deleteUserFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User is deleted successfully",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req, res) => {
  const result = await userServices.getAllUsers();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "get all User successfully",
    data: result,
  });
});

export const userControllers = {
  createUser,
  updateAUserIntoDB,
  deleteUserFromDB,
  getAllUsers,
};
