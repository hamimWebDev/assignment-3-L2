"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableTimeSlots = void 0;
// Convert time string to integer (minutes since midnight)
const convertTimeStringToMinutes = (timeString) => {
    const [hours, minutes] = timeString.split(":");
    return parseInt(hours) * 60 + parseInt(minutes);
};
// Convert integer back to time string (HH:MM)
const convertMinutesToTimeString = (minutes) => {
    const hours = Math.floor(minutes / 60)
        .toString()
        .padStart(2, "0");
    const remainingMinutes = (minutes % 60).toString().padStart(2, "0");
    return `${hours}:${remainingMinutes}`;
};
// Find available time ranges considering entire day
const getAvailableTimeSlots = (bookings) => {
    const availableSlots = [];
    const startOfDay = "00:00"; // Assuming working day starts at midnight
    const endOfDay = "23:59"; // Assuming working day ends at 11:59 PM
    let currentStartMinutes = convertTimeStringToMinutes(startOfDay);
    // Sort bookings by start time
    bookings.sort((a, b) => convertTimeStringToMinutes(a.startTime) -
        convertTimeStringToMinutes(b.startTime));
    // Find gaps between bookings
    for (const booking of bookings) {
        const bookingStartMinutes = convertTimeStringToMinutes(booking.startTime);
        const bookingEndMinutes = convertTimeStringToMinutes(booking.endTime);
        if (bookingStartMinutes > currentStartMinutes) {
            availableSlots.push({
                startTime: convertMinutesToTimeString(currentStartMinutes),
                endTime: convertMinutesToTimeString(bookingStartMinutes),
            });
        }
        currentStartMinutes = Math.max(currentStartMinutes, bookingEndMinutes);
    }
    // Check for availability after the last booking until end of day
    if (currentStartMinutes < convertTimeStringToMinutes(endOfDay)) {
        availableSlots.push({
            startTime: convertMinutesToTimeString(currentStartMinutes),
            endTime: endOfDay,
        });
    }
    return availableSlots;
};
exports.getAvailableTimeSlots = getAvailableTimeSlots;
