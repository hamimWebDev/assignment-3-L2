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
exports.FacultyBooking = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const bookingFacilitySchema = new mongoose_1.Schema({
    facility: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "facility id is required"],
        ref: "Faculty",
    },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    payableAmount: { type: Number },
    isBooked: { type: String, default: "confirmed" },
});
// Pre-save hook to check for existing booking and calculate payable amount
bookingFacilitySchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // Check if there's an existing booking with the same facility, date, startTime, and endTime
        const existingBooking = yield mongoose_1.default.models["Faculty-booking"].findOne({
            facility: this.facility,
            date: this.date,
            startTime: this.startTime,
            endTime: this.endTime,
            isBooked: "confirmed",
        });
        if (existingBooking) {
            return next(new Error("This time slot is already booked."));
        }
        const pricePerHour = 30; // price per hour set to 30
        const startTime = new Date(`1970-01-01T${this.startTime}:00Z`);
        const endTime = new Date(`1970-01-01T${this.endTime}:00Z`);
        const durationInHours = (endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60); // convert milliseconds to hours
        this.payableAmount = durationInHours * pricePerHour;
        next();
    });
});
exports.FacultyBooking = mongoose_1.default.model("Faculty-booking", bookingFacilitySchema);
