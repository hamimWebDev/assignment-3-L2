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
exports.facultyControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const CatchAsync_1 = require("../Utils/CatchAsync");
const SendResponse_1 = require("../Utils/SendResponse");
const FacilityService_1 = require("./FacilityService");
const FacilityValidation_1 = require("./FacilityValidation");
const createFaculty = (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const facultyData = req.body;
    const zodData = FacilityValidation_1.FacultyValidation.facultyValidationSchema.parse(facultyData);
    const result = yield FacilityService_1.facultyServices.postFacultyFromDb(zodData);
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Facility added successfully",
        data: result,
    });
}));
const updateAFacultyIntoDB = (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield FacilityService_1.facultyServices.updateAFacultyIntoDB(id, req.body);
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Faculty is updated successfully",
        data: result,
    });
}));
const deleteFacultyFromDB = (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield FacilityService_1.facultyServices.deleteFacultyFromDB(id);
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Faculty is deleted successfully",
        data: result,
    });
}));
const getAllFacultyFromDd = (0, CatchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield FacilityService_1.facultyServices.getAllFacultyFromDd();
    (0, SendResponse_1.sendResponse)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Facilities retrieved successfully",
        data: result,
    });
}));
exports.facultyControllers = {
    createFaculty,
    updateAFacultyIntoDB,
    deleteFacultyFromDB,
    getAllFacultyFromDd,
};
