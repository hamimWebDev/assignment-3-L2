import mongoose, { Schema } from "mongoose";
import { TFacilityBooking } from "./BookingFaccilityInterface";

const bookingFacilitySchema = new Schema<TFacilityBooking>({
  facility: {
    type: Schema.Types.ObjectId,
    required: [true, "facility id is required"],
    unique: true,
    ref: "Facility",
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
