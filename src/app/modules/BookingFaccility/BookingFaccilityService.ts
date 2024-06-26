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

export const facultyBookingServices = {
  postBookingFacultyFromDb,
};