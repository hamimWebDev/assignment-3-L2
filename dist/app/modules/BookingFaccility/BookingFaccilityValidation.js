"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBookingData = exports.FacultyBooking = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importStar(require("mongoose"));
// Zod validation schema
const facilityBookingSchema = zod_1.z.object({
    facility: zod_1.z.string(),
    date: zod_1.z.string().nonempty("Date is required"),
    startTime: zod_1.z.string().nonempty("Start time is required"),
    endTime: zod_1.z.string().nonempty("End time is required"),
    user: zod_1.z.string(),
    payableAmount: zod_1.z.number().optional(),
    isBooked: zod_1.z.string().default("confirmed"),
    paymentStatus: zod_1.z.enum(["Pending", "Paid", "Failed"]).default("Pending"),
    transactionId: zod_1.z.string().nonempty("Transaction ID is required"),
});
// Mongoose schema
const bookingFacilitySchema = new mongoose_1.Schema({
    facility: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "Facility ID is required"],
        ref: "Faculty",
    },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    payableAmount: { type: Number },
    isBooked: { type: String, default: "confirmed" },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending"
    },
    transactionId: { type: String, required: [true, "Transaction ID is required"] },
});
// Pre-save middleware to calculate payableAmount
bookingFacilitySchema.pre("save", function (next) {
    const pricePerHour = 30; // Price per hour set to 30
    const startTime = new Date(`1970-01-01T${this.startTime}:00Z`);
    const endTime = new Date(`1970-01-01T${this.endTime}:00Z`);
    const durationInHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); // Convert milliseconds to hours
    this.payableAmount = durationInHours * pricePerHour;
    next();
});
exports.FacultyBooking = mongoose_1.default.model("Faculty-booking", bookingFacilitySchema);
// Example function to validate data using Zod
const validateBookingData = (data) => {
    return facilityBookingSchema.parse(data);
};
exports.validateBookingData = validateBookingData;
