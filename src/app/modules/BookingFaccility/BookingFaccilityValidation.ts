import { z } from "zod";
import mongoose, { Schema } from "mongoose";
import { TFacilityBooking } from "./BookingFaccilityInterface";

// Zod validation schema
const facilityBookingSchema = z.object({
  facility: z.string(),
  date: z.string().nonempty("date is required"),
  startTime: z.string().nonempty("start time is required"),
  endTime: z.string().nonempty("end time is required"),
  user: z.string(),
  payableAmount: z.number().optional(),
  isBooked: z.string().default("confirmed"),
});

// Mongoose schema
const bookingFacilitySchema = new Schema<TFacilityBooking>({
  facility: {
    type: Schema.Types.ObjectId,
    required: [true, "facility id is required"],
    ref: "Faculty",
  },
  date: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  payableAmount: { type: Number },
  isBooked: { type: String, default: "confirmed" },
});

bookingFacilitySchema.pre<TFacilityBooking>("save", function (next) {
  const pricePerHour = 30; // price per hour set to 30

  const startTime = new Date(`1970-01-01T${this.startTime}:00Z`);
  const endTime = new Date(`1970-01-01T${this.endTime}:00Z`);

  const durationInHours =
    (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); // convert milliseconds to hours

  this.payableAmount = durationInHours * pricePerHour;

  next();
});

export const FacultyBooking = mongoose.model<TFacilityBooking>(
  "Faculty-booking",
  bookingFacilitySchema,
);

// Example function to validate data using Zod
export const validateBookingData = (data: unknown) => {
  return facilityBookingSchema.parse(data);
};
