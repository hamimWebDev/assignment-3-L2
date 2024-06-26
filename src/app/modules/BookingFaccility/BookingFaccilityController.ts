import httpStatus from "http-status";
import { catchAsync } from "../Utils/CatchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendResponse } from "../Utils/SendResponse";
import { facultyBookingServices } from "./BookingFaccilityService";
import config from "../../config";

const postBookingFacultyFromDb = catchAsync(async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: "No token provided",
      data: {},
    });
  }

  if (!config.jwt_secret) {
    return sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: "JWT secret is not defined",
      data: {},
    });
  }

  const decoded = jwt.verify(token, config.jwt_secret) as JwtPayload;
  req.user = decoded;

  // Example usage of 'userId'
  const { userId } = decoded;

  const facultyBookingData = req.body;

  const result = await facultyBookingServices.postBookingFacultyFromDb(
    facultyBookingData,
    userId,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

export const facultyBookingControllers = {
  postBookingFacultyFromDb,
};
