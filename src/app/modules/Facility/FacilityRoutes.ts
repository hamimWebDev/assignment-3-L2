import express from "express";
import { facultyControllers } from "./FacilityController";
import { auth } from "../Middlewares/Auth";

const router = express.Router();

router.post("/", auth("admin"), facultyControllers.createFaculty);
router.put("/:id", auth("admin"), facultyControllers.updateAFacultyIntoDB);

export const FacultyRoutes = router;
