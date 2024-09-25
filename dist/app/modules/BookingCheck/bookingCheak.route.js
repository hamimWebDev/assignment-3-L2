"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingCheckerRoutes = void 0;
const express_1 = __importDefault(require("express"));
const bookingCheck_controller_1 = require("./bookingCheck.controller");
const router = express_1.default.Router();
router.get('/', bookingCheck_controller_1.BookingCheckerController.bookingChecker);
exports.BookingCheckerRoutes = router;
