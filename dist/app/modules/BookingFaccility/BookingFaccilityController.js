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
const postBookingFacultyFromDb = (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenBearer = req.headers.authorization;
    if (!tokenBearer) {
        return (0, SendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: "Bearer token provided please",
            data: {},
        });
    }
    const token = tokenBearer.split("Bearer ")[1];
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
    const result = yield BookingFaccilityService_1.facultyBookingServices.getAllBooking();
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Bookings retrieved successfully",
        data: result,
    });
}));
const getUserBooking = (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tokenBearer = req.headers.authorization;
    if (!tokenBearer) {
        return (0, SendResponse_1.sendResponse)(res, {
            statusCode: http_status_1.default.UNAUTHORIZED,
            success: false,
            message: "Bearer token provided please",
            data: {},
        });
    }
    const token = tokenBearer.split("Bearer ")[1];
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
