"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAvailabilityRoutes = void 0;
const express_1 = __importDefault(require("express"));
const CheckAvailabilityController_1 = require("./CheckAvailabilityController");
const router = express_1.default.Router();
router.get("/", CheckAvailabilityController_1.CheckAvailabilityController.getCheckAvailability);
exports.checkAvailabilityRoutes = router;
