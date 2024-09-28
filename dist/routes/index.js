"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const UserRoutes_1 = require("../app/modules/User/UserRoutes");
const LoginRoute_1 = require("../app/modules/Login/LoginRoute");
const FacilityRoutes_1 = require("../app/modules/Facility/FacilityRoutes");
const BookingFaccilityRoutes_1 = require("../app/modules/BookingFaccility/BookingFaccilityRoutes");
const bookingCheak_route_1 = require("../app/modules/BookingCheck/bookingCheak.route");
const PaymentRoutes_1 = require("../app/modules/Payment/PaymentRoutes");
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
        route: bookingCheak_route_1.BookingCheckerRoutes,
    },
    {
        path: "/payment",
        route: PaymentRoutes_1.PaymentsRoutes,
    },
];
moduleRoutes.forEach((route) => exports.router.use(route.path, route.route));
