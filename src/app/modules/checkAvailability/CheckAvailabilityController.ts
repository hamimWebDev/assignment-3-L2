import { FacultyBooking } from "../BookingFaccility/BookingFaccilityModel";
import { catchAsync } from "../Utils/CatchAsync";

const getCheckAvailability = catchAsync(async (req, res) => {
  const dateString = req.query.date as string;

  // Retrieve bookings for the specified custom time ranges
  const bookings = await FacultyBooking.find({ date: dateString });

  const bookedSlots = bookings.map((booking) => ({
    startTime: booking.startTime,
    endTime: booking.endTime,
  }));

  res.json({
    success: true,
    statusCode: 200,
    message: "Availability checked successfully",
    data: bookedSlots,
  });
});

export const CheckAvailabilityController = {
  getCheckAvailability,
};
