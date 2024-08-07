"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const UserRoutes_1 = require("../app/modules/User/UserRoutes");
const LoginRoute_1 = require("../app/modules/Login/LoginRoute");
const FacilityRoutes_1 = require("../app/modules/Facility/FacilityRoutes");
const BookingFaccilityRoutes_1 = require("../app/modules/BookingFaccility/BookingFaccilityRoutes");
const CheckAvailabilityRoute_1 = require("../app/modules/checkAvailability/CheckAvailabilityRoute");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/auth",
        route: UserRoutes_1.userRoutes,
    },
    {
        path: "/auth",
        route: LoginRoute_1.LoginRoutes,
    },
    {
        path: "/facility",
        route: FacilityRoutes_1.FacultyRoutes,
    },
    {
        path: "/bookings",
        route: BookingFaccilityRoutes_1.facultyBookingRoutes,
    },
    {
        path: "/check-availability",
        route: CheckAvailabilityRoute_1.checkAvailabilityRoutes,
    },
];
moduleRoutes.forEach((route) => exports.router.use(route.path, route.route));
