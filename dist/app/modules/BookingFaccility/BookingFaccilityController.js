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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyBookingControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const CatchAsync_1 = require("../Utils/CatchAsync");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const SendResponse_1 = require("../Utils/SendResponse");
const BookingFaccilityService_1 = require("./BookingFaccilityService");
const config_1 = __importDefault(require("../../config"));
const BookingFaccilityModel_1 = require("./BookingFaccilityModel");
const postBookingFacultyFromDb = (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        return (0, SendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: "No token provided",
            data: {},
        });
    }
    if (!config_1.default.jwt_secret) {
        return (0, SendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            success: false,
            message: "JWT secret is not defined",
            data: {},
        });
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
    req.user = decoded;
    // Example usage of 'userId'
    const { userId } = decoded;
    const facultyBookingData = req.body;
    const result = yield BookingFaccilityService_1.facultyBookingServices.postBookingFacultyFromDb(facultyBookingData, userId);
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking created successfully",
        data: result,
    });
}));
// getAllBooking
const getAllBooking = (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const dateString = req.query.date;
    if (dateString) {
        // Custom availability time ranges
        const customAvailability = [
            { startTime: "10:00", endTime: "11:00" },
            { startTime: "13:00", endTime: "14:00" },
            // Add more custom time ranges as needed
        ];
        // Function to convert string time to Date object
        function parseTime(timeString) {
            const [hours, minutes] = timeString
                .split(":")
                .map((part) => parseInt(part, 10));
            const date = new Date();
            date.setHours(hours, minutes, 0, 0);
            return date;
        }
        // Retrieve bookings for the specified custom time ranges
        const bookings = yield BookingFaccilityModel_1.FacultyBooking.find({
            $or: customAvailability.map((slot) => ({
                startTime: parseTime(slot.startTime),
                endTime: parseTime(slot.endTime),
            })),
        });
        // Convert bookings to time slots
        const bookedSlots = bookings.map((booking) => ({
            startTime: parseTime(booking.startTime),
            endTime: parseTime(booking.endTime),
        }));
        // Function to generate available time slots based on custom ranges
        function generateAvailableSlots() {
            const availableSlots = [];
            // Iterate over each custom availability range
            customAvailability.forEach((slot) => {
                let currentSlotStart = parseTime(slot.startTime).getHours();
                const endHour = parseTime(slot.endTime).getHours();
                while (currentSlotStart < endHour) {
                    const currentSlotEnd = currentSlotStart + 1; // Assuming each slot is 1 hour long
                    const slotTime = `${currentSlotStart.toString().padStart(2, "0")}:00`;
                    const isBooked = bookedSlots.some((bookedSlot) => currentSlotStart >= bookedSlot.startTime.getHours() &&
                        currentSlotStart < bookedSlot.endTime.getHours());
                    if (!isBooked) {
                        availableSlots.push({
                            startTime: slotTime,
                            endTime: `${currentSlotEnd.toString().padStart(2, "0")}:00`,
                        });
                    }
                    currentSlotStart++; // Move to the next hour
                }
            });
            return availableSlots;
        }
        const availableSlots = generateAvailableSlots();
        // hi
        // Prepare and send the response
        res.json({
            success: true,
            statusCode: 200,
            message: "Availability checked successfully",
            data: availableSlots,
        });
    }
    else {
        const result = yield BookingFaccilityService_1.facultyBookingServices.getAllBooking();
        (0, SendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: "Bookings retrieved successfully",
            data: result,
        });
    }
}));
const getUserBooking = (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        return (0, SendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: "No token provided",
            data: {},
        });
    }
    if (!config_1.default.jwt_secret) {
        return (0, SendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.INTERNAL_SERVER_ERROR,
            success: false,
            message: "JWT secret is not defined",
            data: {},
        });
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
    req.user = decoded;
    // Example usage of 'userId'
    const { userId } = decoded;
    const result = yield BookingFaccilityService_1.facultyBookingServices.getUserBooking(userId);
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Bookings retrieved successfully",
        data: result,
    });
}));
const cancelBookingFromDB = (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield BookingFaccilityService_1.facultyBookingServices.cancelBookingFromDB(id);
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Booking cancelled successfully",
        data: result,
    });
}));
exports.facultyBookingControllers = {
    postBookingFacultyFromDb,
    getAllBooking,
    getUserBooking,
    cancelBookingFromDB,
};
