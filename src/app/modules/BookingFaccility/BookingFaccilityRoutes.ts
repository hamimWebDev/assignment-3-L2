import express from "express";
import { facultyBookingControllers } from "./BookingFaccilityController";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  auth("user"),
  facultyBookingControllers.postBookingFacultyFromDb,
);

router.get("/", auth("admin"), facultyBookingControllers.getAllBooking);
router.get("/user", auth("user"), facultyBookingControllers.getUserBooking);
router.delete(
  "/:id",
  auth("user"),
  facultyBookingControllers.cancelBookingFromDB,
);

export const facultyBookingRoutes = router;
