import mongoose, { Schema } from "mongoose";
import { TFacilityBooking } from "./BookingFaccilityInterface";

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

// Pre-save hook to check for existing booking and calculate payable amount
bookingFacilitySchema.pre<TFacilityBooking>("save", async function (next) {
  // Check if there's an existing booking with the same facility, date, startTime, and endTime
  const existingBooking = await mongoose.models["Faculty-booking"].findOne({
    facility: this.facility,
    date: this.date,
    startTime: this.startTime,
    endTime: this.endTime,
    isBooked: "confirmed",
  });

  if (existingBooking) {
    return next(new Error("This time slot is already booked."));
  }

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
