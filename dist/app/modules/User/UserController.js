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
exports.userControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const CatchAsync_1 = require("../Utils/CatchAsync");
const SendResponse_1 = require("../Utils/SendResponse");
const UserService_1 = require("./UserService");
const UserValidation_1 = require("./UserValidation");
const config_1 = __importDefault(require("../../config"));
const createUser = (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = req.body;
    const zodData = UserValidation_1.userValidation.userValidationSchema.parse(userData);
    const { accessToken, refreshToken, rest } = yield UserService_1.userServices.postUserFromDb(zodData);
    // add this
    res.cookie("refreshToken", refreshToken, {
        secure: config_1.default.NODE_ENV === "production",
        httpOnly: true,
    });
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User registered successfully",
        token: accessToken,
        data: rest,
    });
}));
const updateAUserIntoDB = (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield UserService_1.userServices.updateAUserIntoDB(id, req.body);
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Faculty is updated successfully",
        data: result,
    });
}));
const deleteUserFromDB = (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield UserService_1.userServices.deleteUserFromDB(id);
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User is deleted successfully",
        data: result,
    });
}));
const getAllUsers = (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield UserService_1.userServices.getAllUsers();
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "get all User successfully",
        data: result,
    });
}));
const getAUsers = (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield UserService_1.userServices.getAUsers(id);
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "get all User successfully",
        data: result,
    });
}));
exports.userControllers = {
    createUser,
    updateAUserIntoDB,
    deleteUserFromDB,
    getAllUsers,
    getAUsers,
};
