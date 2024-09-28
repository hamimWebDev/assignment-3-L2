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
exports.paymentServices = void 0;
const BookingFaccilityModel_1 = require("../BookingFaccility/BookingFaccilityModel");
const Payment_utils_1 = require("./Payment.utils");
const ejs_1 = __importDefault(require("ejs"));
const path_1 = require("path");
const confirmationService = (transactionId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verifyResponse = yield (0, Payment_utils_1.verifyPayment)(transactionId);
        let paymentData;
        if (verifyResponse && verifyResponse.pay_status === "Successful") {
            // Update the payment status to "Paid" in the database
            yield BookingFaccilityModel_1.FacultyBooking.findOneAndUpdate({ transactionId }, {
                paymentStatus: "Paid",
            });
            // Prepare payment data for the confirmation template
            paymentData = {
                consumerName: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.cus_name,
                email: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.cus_email,
                phone: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.cus_phone,
                transactionId: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.mer_txnid,
                amount: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.amount,
                currency: "BDT",
                payment_type: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.payment_type,
                payTime: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.date,
                paymentStatus: verifyResponse === null || verifyResponse === void 0 ? void 0 : verifyResponse.pay_status,
            };
        }
        // Decide which template to render based on payment status
        const templatePath = status === "Success"
            ? (0, path_1.join)(process.cwd(), "/src/views/confrimation.ejs") // Fix the typo
            : (0, path_1.join)(process.cwd(), "/src/views/failded.ejs"); // Fix the typo
        const template = yield ejs_1.default.renderFile(templatePath, paymentData || {});
        return template;
    }
    catch (error) {
        console.error("Error in confirmationService:", error);
        throw new Error("An error occurred while processing the payment confirmation.");
    }
});
exports.paymentServices = {
    confirmationService,
};
