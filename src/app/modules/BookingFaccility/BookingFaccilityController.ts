import httpStatus from "http-status";
import { catchAsync } from "../Utils/CatchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import { sendResponse } from "../Utils/SendResponse";
import { facultyBookingServices } from "./BookingFaccilityService";
import config from "../../config";
import { FacultyBooking } from "./BookingFaccilityModel";

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

interface TimeSlot {
  startTime: string;
  endTime: string;
}

// getAllBooking
const getAllBooking = catchAsync(async (req, res) => {
  const dateString = req.query.date as string;
  if (dateString) {
    // Custom availability time ranges
    const customAvailability = [
      { startTime: "10:00", endTime: "11:00" },
      { startTime: "13:00", endTime: "14:00" },
      // Add more custom time ranges as needed
    ];

    // Function to convert string time to Date object
    function parseTime(timeString: string): Date {
      const [hours, minutes] = timeString
        .split(":")
        .map((part) => parseInt(part, 10));
      const date = new Date();
      date.setHours(hours, minutes, 0, 0);
      return date;
    }

    // Retrieve bookings for the specified custom time ranges
    const bookings = await FacultyBooking.find({
      $or: customAvailability.map((slot) => ({
        startTime: parseTime(slot.startTime),
        endTime: parseTime(slot.endTime),
      })),
    });

    // Convert bookings to time slots
    const bookedSlots = bookings.map((booking) => ({
      startTime: parseTime(booking.startTime),
      endTime: parseTime(booking.endTime),
    }));

    // Function to generate available time slots based on custom ranges
    function generateAvailableSlots(): TimeSlot[] {
      const availableSlots: TimeSlot[] = [];

      // Iterate over each custom availability range
      customAvailability.forEach((slot) => {
        let currentSlotStart = parseTime(slot.startTime).getHours();
        const endHour = parseTime(slot.endTime).getHours();

        while (currentSlotStart < endHour) {
          const currentSlotEnd = currentSlotStart + 1; // Assuming each slot is 1 hour long
          const slotTime = `${currentSlotStart.toString().padStart(2, "0")}:00`;

          const isBooked = bookedSlots.some(
            (bookedSlot) =>
              currentSlotStart >= bookedSlot.startTime.getHours() &&
              currentSlotStart < bookedSlot.endTime.getHours(),
          );

          if (!isBooked) {
            availableSlots.push({
              startTime: slotTime,
              endTime: `${currentSlotEnd.toString().padStart(2, "0")}:00`,
            });
          }

          currentSlotStart++; // Move to the next hour
        }
      });

      return availableSlots;
    }

    const availableSlots: TimeSlot[] = generateAvailableSlots();
    // hi

    // Prepare and send the response
    res.json({
      success: true,
      statusCode: 200,
      message: "Available slots retrieved successfully",
      data: availableSlots,
    });
  } else {
    const result = await facultyBookingServices.getAllBooking();
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "get all User successfully",
      data: result,
    });
  }
});

const getUserBooking = catchAsync(async (req, res) => {
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
  const result = await facultyBookingServices.getUserBooking(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Facilities retrieved successfully",
    data: result,
  });
});

export const facultyBookingControllers = {
  postBookingFacultyFromDb,
  getAllBooking,
  getUserBooking,
};
