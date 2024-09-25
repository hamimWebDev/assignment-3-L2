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
exports.BookingCheakerServices = void 0;
const BookingFaccilityModel_1 = require("../BookingFaccility/BookingFaccilityModel");
const FacilityModel_1 = require("../Facility/FacilityModel");
const bookingCheaker_utils_1 = require("./bookingCheaker.utils");
const bookingCheakerFromDb = (query) => __awaiter(void 0, void 0, void 0, function* () {
    // todays date
    const date = new Date().toISOString();
    const currentDate = date.substring(0, date.indexOf("T"));
    const requestedDate = query.date || currentDate;
    const id = query.facilityId; // facility id
    const facilityCheck = yield FacilityModel_1.Faculty.findById(id);
    if (!facilityCheck) {
        throw new Error("Facility faild to find");
    }
    const result = yield BookingFaccilityModel_1.FacultyBooking.find({ date: requestedDate, isBooked: { $ne: "canceled" } }, { endTime: 1, startTime: 1, _id: 0 });
    const availableSlots = (0, bookingCheaker_utils_1.getAvailableTimeSlots)(result);
    if (!availableSlots[0]) {
        throw new Error("On this date no availble time to provide so please booking others date");
    }
    return availableSlots;
});
exports.BookingCheakerServices = {
    bookingCheakerFromDb,
};
