import { Types } from "mongoose";
import { TFacilityBooking } from "./BookingFaccilityInterface";
import { FacultyBooking } from "./BookingFaccilityModel";
import { AppError } from "../Errors/AppErrors";
import httpStatus from "http-status";

const postBookingFacultyFromDb = async (
  bookingData: TFacilityBooking,
  userId: Types.ObjectId,
) => {
  // Create the facultyBooking in the database
  bookingData.user = userId;
  const result = await FacultyBooking.create(bookingData);
  return result;
};

const getAllBooking = async () => {
  const result = await FacultyBooking.find()
    .populate("facility")
    .populate("user");
  return result;
};

const getUserBooking = async (userId: Types.ObjectId) => {
  const result = await FacultyBooking.find({ user: userId })
    .populate("facility")
    .populate("user");
  return result;
};

const cancelBookingFromDB = async (id: string) => {
  // const requestFaculty = await Faculty.findOne({ _id: id });
  // if (requestFaculty?.isDeleted === true) {
  //   throw new AppError(
  //     httpStatus.BAD_REQUEST,
  //     "Failed this faculty is already deleted",
  //   );
  // }
  const cancelBooking = await FacultyBooking.findOneAndUpdate(
    { _id: id },
    { isBooked: "canceled" },
    { new: true, runValidators: true },
  );

  if (!cancelBooking) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed to delete faculty");
  }

  return cancelBooking;
};

export const facultyBookingServices = {
  postBookingFacultyFromDb,
  getAllBooking,
  getUserBooking,
  cancelBookingFromDB,
};
