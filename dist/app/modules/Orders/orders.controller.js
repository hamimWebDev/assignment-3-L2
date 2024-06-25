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
exports.ordersController = void 0;
const orders_service_1 = require("./orders.service");
const orders_model_1 = __importDefault(require("./orders.model"));
const order_zod_validation_1 = __importDefault(require("./order.zod.validation"));
const postOrdersFromDb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        const zodData = order_zod_validation_1.default.parse(orderData);
        const result = yield orders_service_1.ordersService.postOrdersFromDb(zodData);
        res.json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
});
const getAllOrdersFromDb = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        if (typeof email == "undefined") {
            const result = yield orders_service_1.ordersService.getAllOrdersFromDb();
            res.json({
                success: true,
                message: "Orders fetched successfully!",
                data: result,
            });
        }
        else if (typeof email !== "undefined") {
            const orders = yield orders_model_1.default.find({ email: { $eq: email } });
            return res.json(orders);
        }
    }
    catch (err) {
        res.status(404).json({
            success: false,
            message: err.message,
        });
    }
});
exports.ordersController = {
    postOrdersFromDb,
    getAllOrdersFromDb,
};
