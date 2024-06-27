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
exports.LoginServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppErrors_1 = require("../errors/AppErrors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const UserSchemaModel_1 = require("../User/UserSchemaModel");
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserExist = yield (UserSchemaModel_1.User === null || UserSchemaModel_1.User === void 0 ? void 0 : UserSchemaModel_1.User.isUserExistByCustomEmail(payload === null || payload === void 0 ? void 0 : payload.email));
    if (!isUserExist) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "user is fot found");
    }
    const isPasswordMashed = yield UserSchemaModel_1.User.isPasswordMashed(payload.password, isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.password);
    if (isPasswordMashed === false) {
        throw new AppErrors_1.AppError(http_status_1.default.FORBIDDEN, "password do not match");
    }
    const jwtPayload = {
        userId: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_secret, {
        expiresIn: "10d",
    });
    const { _id, name, email, role, phone, address } = isUserExist;
    const user = { _id, name, email, role, phone, address };
    return {
        accessToken,
        user,
    };
});
exports.LoginServices = {
    loginUser,
};
