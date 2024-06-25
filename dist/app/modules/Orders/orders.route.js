"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ordersRoute = void 0;
const express_1 = __importDefault(require("express"));
const orders_controller_1 = require("./orders.controller");
const router = express_1.default.Router();
// post orders
router.post("/", orders_controller_1.ordersController.postOrdersFromDb);
// grt All orders and search email
router.get("/", orders_controller_1.ordersController.getAllOrdersFromDb);
exports.ordersRoute = router;
