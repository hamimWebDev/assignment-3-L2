import { Types, UpdateQuery } from "mongoose";
import { TFacilityBooking } from "./BookingFaccilityInterface";
import { FacultyBooking } from "./BookingFaccilityModel";
import { AppError } from "../errors/AppErrors";
import httpStatus from "http-status";
import { initialPayment } from "../Payment/Payment.utils";

const generateTransactionId = (): string => {
  const timestamp = Date.now().toString(); // Current timestamp
  const randomNum = Math.floor(Math.random() * 1000000).toString(); // Random 6-digit number
  return `${timestamp}-${randomNum}`; // Combines timestamp and random number
};

const postBookingFacultyFromDb = async (
  bookingData: TFacilityBooking,
  userId: Types.ObjectId,
) => {
  try {
    // Assign userId to bookingData
    bookingData.user = userId;
    const transactionId = generateTransactionId();

    // Create the faculty booking in the database
    let result = await FacultyBooking.create({ ...bookingData, transactionId });

    // Populate the necessary fields (facility and user) after the document is created
    result = await (await result.populate("facility")).populate("user");

    // Destructure relevant fields from the result
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { payableAmount, user } = result as any;

    const paymentData = {
      transactionId,
      totalPrice: payableAmount,
      customerName: user?.name,
      customerEmail: user?.email,
      customerPhone: user?.phone,
      customerAddress: user?.address,
    };

    // Proceed with payment
    const { payment_url } = await initialPayment(paymentData);

    return { result, payment_url };
  } catch (error) {
    console.error("Error posting faculty booking:", error);
    throw error;
  }
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
  })
    .populate("facility")
    .populate("user");
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
