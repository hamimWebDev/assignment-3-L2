"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckAvailabilityController = void 0;
const BookingFaccilityModel_1 = require("../BookingFaccility/BookingFaccilityModel");
const CatchAsync_1 = require("../Utils/CatchAsync");
const getCheckAvailability = (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dateString = req.query.date;
    // Retrieve bookings for the specified custom time ranges
    const bookings = yield BookingFaccilityModel_1.FacultyBooking.find({ date: dateString });
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
}));
exports.CheckAvailabilityController = {
    getCheckAvailability,
};
