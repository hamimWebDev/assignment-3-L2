import httpStatus from "http-status";

import { BookingCheakerServices } from "./bookingCheck.service";
import { catchAsync } from "../Utils/CatchAsync";
import { sendResponse } from "../Utils/SendResponse";

const bookingChecker = catchAsync(async (req, res) => {
  const query = req.query;
  const result = await BookingCheakerServices.bookingCheakerFromDb(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Availability checked successfully",
    data: result,
  });
});

export const BookingCheckerController = {
  bookingChecker,
};
