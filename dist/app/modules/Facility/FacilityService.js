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
exports.facultyServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppErrors_1 = require("../errors/AppErrors");
const FacilityModel_1 = require("./FacilityModel");
const postFacultyFromDb = (facultyData) => __awaiter(void 0, void 0, void 0, function* () {
    // Create the user in the database
    const result = yield FacilityModel_1.Faculty.create(facultyData);
    return result;
});
const updateAFacultyIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield FacilityModel_1.Faculty.findOneAndUpdate({ _id: id, isDeleted: false }, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteFacultyFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const requestFaculty = yield FacilityModel_1.Faculty.findOne({ _id: id });
    if ((requestFaculty === null || requestFaculty === void 0 ? void 0 : requestFaculty.isDeleted) === true) {
        throw new AppErrors_1.AppError(http_status_1.default.BAD_REQUEST, "Failed this faculty is already deleted");
    }
    const deletedFaculty = yield FacilityModel_1.Faculty.findOneAndUpdate({ _id: id }, { isDeleted: true }, { new: true, runValidators: true });
    if (!deletedFaculty) {
        throw new AppErrors_1.AppError(http_status_1.default.BAD_REQUEST, "Failed to delete faculty");
    }
    return deletedFaculty;
});
const getAllFacultyFromDd = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield FacilityModel_1.Faculty.find({ isDeleted: false });
    return result;
});
exports.facultyServices = {
    postFacultyFromDb,
    updateAFacultyIntoDB,
    deleteFacultyFromDB,
    getAllFacultyFromDd,
};
