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
exports.facultyBookingServices = void 0;
const BookingFaccilityModel_1 = require("./BookingFaccilityModel");
const AppErrors_1 = require("../errors/AppErrors");
const http_status_1 = __importDefault(require("http-status"));
const postBookingFacultyFromDb = (bookingData, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Create the facultyBooking in the database
    bookingData.user = userId;
    const result = yield BookingFaccilityModel_1.FacultyBooking.create(bookingData);
    return result;
});
const updateABookingIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield BookingFaccilityModel_1.FacultyBooking.findOneAndUpdate({ _id: id, isBooked: "confirmed" }, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const getAllBooking = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield BookingFaccilityModel_1.FacultyBooking.find({ isBooked: "confirmed" })
        .populate("facility")
        .populate("user");
    return result;
});
const getUserBooking = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield BookingFaccilityModel_1.FacultyBooking.find({
        user: userId,
        isBooked: "confirmed",
    })
        .populate("facility")
        .populate("user");
    return result;
});
const getABooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield BookingFaccilityModel_1.FacultyBooking.findOne({
        _id: id,
        isBooked: "confirmed",
    });
    return result;
});
const cancelBookingFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const cancelBooking = yield BookingFaccilityModel_1.FacultyBooking.findOneAndUpdate({ _id: id }, { isBooked: "canceled" }, { new: true, runValidators: true });
    if (!cancelBooking) {
        throw new AppErrors_1.AppError(http_status_1.default.BAD_REQUEST, "Failed cancel booking");
    }
    return cancelBooking;
});
exports.facultyBookingServices = {
    postBookingFacultyFromDb,
    updateABookingIntoDB,
    getAllBooking,
    getUserBooking,
    getABooking,
    cancelBookingFromDB,
};
