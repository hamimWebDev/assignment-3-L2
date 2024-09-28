"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const PaymentController_1 = require("./PaymentController");
const router = express_1.default.Router();
router.post("/confirmation", PaymentController_1.PaymentControllers.confirmationController);
exports.PaymentsRoutes = router;
