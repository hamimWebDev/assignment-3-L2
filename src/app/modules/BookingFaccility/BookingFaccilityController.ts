import httpStatus from "http-status";
import { catchAsync } from "../Utils/CatchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendResponse } from "../Utils/SendResponse";
import { facultyBookingServices } from "./BookingFaccilityService";
import config from "../../config";

const postBookingFacultyFromDb = catchAsync(async (req, res) => {
  const tokenBearer = req.headers.authorization;
  if (!tokenBearer) {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: "Bearer token provided please",
      data: {},
    });
  }
  const token = tokenBearer.split("Bearer ")[1];
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
    message: "Booking created successfully",
    data: result,
  });
});

// getAllBooking
const getAllBooking = catchAsync(async (req, res) => {
  const result = await facultyBookingServices.getAllBooking();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const getUserBooking = catchAsync(async (req, res) => {
  const tokenBearer = req.headers.authorization;
  if (!tokenBearer) {
    return sendResponse(res, {
      statusCode: httpStatus.UNAUTHORIZED,
      success: false,
      message: "Bearer token provided please",
      data: {},
    });
  }
  const token = tokenBearer.split("Bearer ")[1];
  

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
  const result = await facultyBookingServices.getUserBooking(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bookings retrieved successfully",
    data: result,
  });
});

const cancelBookingFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await facultyBookingServices.cancelBookingFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Booking cancelled successfully",
    data: result,
  });
});

export const facultyBookingControllers = {
  postBookingFacultyFromDb,
  getAllBooking,
  getUserBooking,
  cancelBookingFromDB,
};
