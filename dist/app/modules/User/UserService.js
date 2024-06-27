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
const config_1 = __importDefault(require("../../config"));
const UserSchemaModel_1 = require("./UserSchemaModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const postUserFromDb = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Hash the user's password
    const hashedPassword = yield bcrypt_1.default.hash(userData.password, Number(config_1.default.bcrypt_salt_routs));
    // Update the userData with the hashed password
    userData.password = hashedPassword;
    // Create the user in the database
    const result = yield UserSchemaModel_1.User.create(userData);
    const _a = result.toObject(), { password, createdAt, updatedAt } = _a, rest = __rest(_a, ["password", "createdAt", "updatedAt"]);
    // Return the user data without the password, createdAt, updatedAt
    return rest;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield UserSchemaModel_1.User.find();
    return result;
});
exports.userServices = {
    postUserFromDb,
    getAllUsers,
};
