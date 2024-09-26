import { Types, UpdateQuery } from "mongoose";
import { TFacilityBooking } from "./BookingFaccilityInterface";
import { FacultyBooking } from "./BookingFaccilityModel";
import { AppError } from "../errors/AppErrors";
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

const updateABookingIntoDB = async (
  id: string,
  payload: UpdateQuery<TFacilityBooking> | undefined,
) => {
  const result = await FacultyBooking.findOneAndUpdate(
    { _id: id, isBooked: "confirmed" },
    payload,
    {
      new: true,
      runValidators: true,
    },
  );
  return result;
};

const getAllBooking = async () => {
  const result = await FacultyBooking.find({ isBooked: "confirmed" })
    .populate("facility")
    .populate("user");
  return result;
};

const getUserBooking = async (userId: Types.ObjectId) => {
  const result = await FacultyBooking.find({
    user: userId,
    isBooked: "confirmed",
  })
    .populate("facility")
    .populate("user");
  return result;
};

const getABooking = async (id: string) => {
  const result = await FacultyBooking.findOne({
    _id: id,
    isBooked: "confirmed",
  }).populate("facility");
  return result;
};

const cancelBookingFromDB = async (id: string) => {
  const cancelBooking = await FacultyBooking.findOneAndUpdate(
    { _id: id },
    { isBooked: "canceled" },
    { new: true, runValidators: true },
  );

  if (!cancelBooking) {
    throw new AppError(httpStatus.BAD_REQUEST, "Failed cancel booking");
  }

  return cancelBooking;
};

export const facultyBookingServices = {
  postBookingFacultyFromDb,
  updateABookingIntoDB,
  getAllBooking,
  getUserBooking,
  getABooking,
  cancelBookingFromDB,
};
