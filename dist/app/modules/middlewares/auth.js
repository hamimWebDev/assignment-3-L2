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
exports.auth = void 0;
const http_status_1 = __importDefault(require("http-status"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const CatchAsync_1 = require("../Utils/CatchAsync");
const AppErrors_1 = require("../errors/AppErrors");
const config_1 = __importDefault(require("../../config"));
const UserSchemaModel_1 = require("../User/UserSchemaModel");
const auth = (...requiredRoles) => {
    return (0, CatchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        // Extract the bearer token from the Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new AppErrors_1.AppError(http_status_1.default.UNAUTHORIZED, "Invalid authorization header. Bearer token expected.");
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            throw new AppErrors_1.AppError(http_status_1.default.UNAUTHORIZED, "You are sending an invalid authorization token");
        }
        try {
            const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_secret);
            req.user = decoded;
            // Example usage of 'role'
            const { role, userId } = decoded;
            const user = yield (UserSchemaModel_1.User === null || UserSchemaModel_1.User === void 0 ? void 0 : UserSchemaModel_1.User.isUserExistByCustomId(userId));
            if (!user) {
                throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "User not found");
            }
            if (requiredRoles && !requiredRoles.includes(role)) {
                throw new AppErrors_1.AppError(http_status_1.default.UNAUTHORIZED, "You are not authorized!");
            }
            else {
                next();
            }
        }
        catch (error) {
            throw new AppErrors_1.AppError(http_status_1.default.UNAUTHORIZED, "Invalid token");
        }
    }));
};
exports.auth = auth;
