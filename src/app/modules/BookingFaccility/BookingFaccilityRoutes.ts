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
router.put(
  "/:id",
  auth("user"),
  facultyBookingControllers.updateABookingIntoDB,
);
router.get("/user", auth("user"), facultyBookingControllers.getUserBooking);
router.get("/:id", facultyBookingControllers.getABooking);
router.delete(
  "/:id",
  auth("user"),
  facultyBookingControllers.cancelBookingFromDB,
);

export const facultyBookingRoutes = router;
