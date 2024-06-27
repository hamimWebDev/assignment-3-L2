"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRoutes = void 0;
const express_1 = __importDefault(require("express"));
const LoginController_1 = require("./LoginController");
const router = express_1.default.Router();
router.post("/login", LoginController_1.LoginControllers.loginUser);
exports.LoginRoutes = router;
