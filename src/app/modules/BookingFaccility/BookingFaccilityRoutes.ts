import express from "express";
import { facultyBookingControllers } from "./BookingFaccilityController";
import { auth } from "../Middlewares/Auth";

const router = express.Router();

router.post(
  "/",
  auth("user"),
  facultyBookingControllers.postBookingFacultyFromDb,
);

export const facultyBookingRoutes = router;
