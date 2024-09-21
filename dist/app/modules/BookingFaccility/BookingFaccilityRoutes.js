"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facultyBookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const BookingFaccilityController_1 = require("./BookingFaccilityController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)("user"), BookingFaccilityController_1.facultyBookingControllers.postBookingFacultyFromDb);
router.get("/", (0, auth_1.auth)("admin"), BookingFaccilityController_1.facultyBookingControllers.getAllBooking);
router.put("/:id", (0, auth_1.auth)("user"), BookingFaccilityController_1.facultyBookingControllers.updateABookingIntoDB);
router.get("/user", (0, auth_1.auth)("user"), BookingFaccilityController_1.facultyBookingControllers.getUserBooking);
router.delete("/:id", (0, auth_1.auth)("user"), BookingFaccilityController_1.facultyBookingControllers.cancelBookingFromDB);
exports.facultyBookingRoutes = router;
