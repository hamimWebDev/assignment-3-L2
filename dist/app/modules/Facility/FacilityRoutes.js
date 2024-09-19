"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacultyRoutes = void 0;
const express_1 = __importDefault(require("express"));
const FacilityController_1 = require("./FacilityController");
const auth_1 = require("../middlewares/auth");
const router = express_1.default.Router();
router.post("/", (0, auth_1.auth)("admin"), FacilityController_1.facultyControllers.createFaculty);
router.put("/:id", (0, auth_1.auth)("admin"), FacilityController_1.facultyControllers.updateAFacultyIntoDB);
router.delete("/:id", (0, auth_1.auth)("admin"), FacilityController_1.facultyControllers.deleteFacultyFromDB);
router.get("/", FacilityController_1.facultyControllers.getAllFacultyFromDd);
router.get("/:id", FacilityController_1.facultyControllers.getAFacultyFromDd);
exports.FacultyRoutes = router;
