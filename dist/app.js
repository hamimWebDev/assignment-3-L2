"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const globalErrorHandler_1 = require("./app/modules/middlewares/globalErrorHandler");
const notFound_1 = require("./app/modules/middlewares/notFound");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
exports.app = (0, express_1.default)();
//parsers
exports.app.use(express_1.default.json());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use((0, cors_1.default)({ origin: ["http://localhost:5173", "http://localhost:5174"] }));
// application routes
exports.app.use("/api", routes_1.router);
exports.app.get("/", (req, res) => {
    res.send("Hello Examiner!");
});
// global ErrorHandler
exports.app.use(globalErrorHandler_1.globalErrorHandler);
// not fount
exports.app.use(notFound_1.notFount);
