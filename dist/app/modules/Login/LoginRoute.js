"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginRoutes = void 0;
const express_1 = __importDefault(require("express"));
const LoginController_1 = require("./LoginController");
const validateRequest_1 = require("../middlewares/validateRequest");
const LoginValidation_1 = require("./LoginValidation");
const router = express_1.default.Router();
router.post("/login", LoginController_1.LoginControllers.loginUser);
router.post("/refresh-token", (0, validateRequest_1.validateRequest)(LoginValidation_1.LoginValidation.refreshTokenValidationSchema), LoginController_1.LoginControllers.refreshToken);
exports.LoginRoutes = router;
