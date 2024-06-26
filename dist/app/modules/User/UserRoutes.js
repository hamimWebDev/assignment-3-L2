"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const UserController_1 = require("./UserController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/signup", UserController_1.userControllers.createUser);
router.get("/users", (0, auth_1.auth)("admin"), UserController_1.userControllers.getAllUsers);
exports.userRoutes = router;
