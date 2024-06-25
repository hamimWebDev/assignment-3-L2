"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const product_route_1 = require("./app/modules/products/product.route");
const orders_route_1 = require("./app/modules/Orders/orders.route");
exports.app = (0, express_1.default)();
//parsers
exports.app.use(express_1.default.json());
exports.app.use("/api/products", product_route_1.productsRoute);
exports.app.use("/api/orders", orders_route_1.ordersRoute);
exports.app.get("/", (req, res) => {
    res.send("Hello Examiner!");
});
