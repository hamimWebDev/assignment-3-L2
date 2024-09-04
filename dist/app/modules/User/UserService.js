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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const AppErrors_1 = require("../errors/AppErrors");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserSchemaModel_1 = require("./UserSchemaModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const postUserFromDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Create the user in the database
    const result = yield UserSchemaModel_1.User.create(userData);
    const isUserExist = yield (UserSchemaModel_1.User === null || UserSchemaModel_1.User === void 0 ? void 0 : UserSchemaModel_1.User.isUserExistByCustomEmail(userData === null || userData === void 0 ? void 0 : userData.email));
    if (!isUserExist) {
        throw new AppErrors_1.AppError(http_status_1.default.NOT_FOUND, "user is fot found");
    }
    const jwtPayload = {
        userId: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.id,
        role: isUserExist === null || isUserExist === void 0 ? void 0 : isUserExist.role,
    };
    const accessToken = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.jwt_secret, {
        expiresIn: "10d",
    });
    // Hash the user's password
    const hashedPassword = yield bcrypt_1.default.hash(userData.password, Number(config_1.default.bcrypt_salt_routs));
    // Update the userData with the hashed password
    userData.password = hashedPassword;
    const _a = result.toObject(), { password, createdAt, updatedAt } = _a, rest = __rest(_a, ["password", "createdAt", "updatedAt"]);
    // Return the user data without the password, createdAt, updatedAt
    return { accessToken, rest };
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield UserSchemaModel_1.User.find();
    return result;
});
exports.userServices = {
    postUserFromDb,
    getAllUsers,
};
