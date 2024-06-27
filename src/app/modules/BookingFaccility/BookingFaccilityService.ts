import { Types } from "mongoose";
import { TFacilityBooking } from "./BookingFaccilityInterface";
import { FacultyBooking } from "./BookingFaccilityModel";

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

export const facultyBookingServices = {
  postBookingFacultyFromDb,
  getAllBooking,
  getUserBooking,
};
