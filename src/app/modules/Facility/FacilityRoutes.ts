import express from "express";
import { facultyControllers } from "./FacilityController";
import { auth } from "../Middlewares/Auth";

const router = express.Router();

router.post("/", auth("admin"), facultyControllers.createFaculty);
router.put("/:id", auth("admin"), facultyControllers.updateAFacultyIntoDB);
router.delete("/:id", auth("admin"), facultyControllers.deleteFacultyFromDB);
router.get("/", facultyControllers.getAllFacultyFromDd);

export const FacultyRoutes = router;
