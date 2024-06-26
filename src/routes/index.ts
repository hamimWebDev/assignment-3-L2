import { Router } from "express";
import { userRoutes } from "../app/modules/User/UserRoutes";
import { LoginRoutes } from "../app/modules/Login/LoginRoute";
import { FacultyRoutes } from "../app/modules/Facility/FacilityRoutes";
import { facultyBookingRoutes } from "../app/modules/BookingFaccility/BookingFaccilityRoutes";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
