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
exports.verifyPayment = exports.initialPayment = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../../config"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initialPayment = (paymentData) => __awaiter(void 0, void 0, void 0, function* () {
    // Fetch dynamic exchange rate from a currency conversion API
    const exchangeRateResponse = yield axios_1.default.get(`https://v6.exchangerate-api.com/v6/302eb4d9acf268aed805490e/latest/USD`);
    const exchangeRateUSDToBDT = exchangeRateResponse.data.conversion_rates.BDT;
    // Calculate the amount in BDT
    const amountInBDT = paymentData.totalPrice * exchangeRateUSDToBDT;
    // Proceed with the payment request
    const response = yield axios_1.default.post(config_1.default.payment_url, {
        store_id: config_1.default.store_id,
        signature_key: config_1.default.signature_key,
        tran_id: paymentData.transactionId,
        success_url: `https://assignment-3-l2-ten.vercel.app/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=Success`,
        fail_url: `https://assignment-3-l2-ten.vercel.app/api/payment/confirmation?status=Failed`,
        cancel_url: "http://localhost:5173/",
        amount: Math.round(amountInBDT),
        currency: "BDT",
        desc: "Merchant Registration Payment",
        cus_name: paymentData.customerName,
        cus_email: paymentData.customerEmail,
        cus_add1: paymentData.customerAddress,
        cus_add2: "N/A",
        cus_city: "N/A",
        cus_state: "N/A",
        cus_postcode: "N/A",
        cus_country: "N/A",
        cus_phone: paymentData.customerPhone,
        type: "json",
    });
    return response.data;
});
exports.initialPayment = initialPayment;
const verifyPayment = (transactionId) => __awaiter(void 0, void 0, void 0, function* () {
    const response = axios_1.default.get(config_1.default.payment_verify_url, {
        params: {
            store_id: config_1.default.store_id,
            signature_key: config_1.default.signature_key,
            type: "json",
            request_id: transactionId,
        },
    });
    return (yield response).data;
});
exports.verifyPayment = verifyPayment;
