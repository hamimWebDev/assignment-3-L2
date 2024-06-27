import express from "express";
import { facultyBookingControllers } from "./BookingFaccilityController";
import { auth } from "../Middlewares/Auth";

const router = express.Router();

router.post(
  "/",
  auth("user"),
  facultyBookingControllers.postBookingFacultyFromDb,
);

router.get("/", auth("admin"), facultyBookingControllers.getAllBooking);
router.get("/user", facultyBookingControllers.getUserBooking);

export const facultyBookingRoutes = router;
