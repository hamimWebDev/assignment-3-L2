import { Router } from "express";
import { userRoutes } from "../app/modules/User/UserRoutes";
import { LoginRoutes } from "../app/modules/Login/LoginRoute";
import { FacultyRoutes } from "../app/modules/Facility/FacilityRoutes";
import { facultyBookingRoutes } from "../app/modules/BookingFaccility/BookingFaccilityRoutes";
import { BookingCheckerRoutes } from "../app/modules/BookingCheck/bookingCheak.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: LoginRoutes,
  },
  {
    path: "/facility",
    route: FacultyRoutes,
  },
  {
    path: "/bookings",
    route: facultyBookingRoutes,
  },
  {
    path: "/check-availability",
    route: BookingCheckerRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
