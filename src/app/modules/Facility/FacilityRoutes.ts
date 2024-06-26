import express from "express";
import { facultyControllers } from "./FacilityController";
import { auth } from "../Middlewares/Auth";

const router = express.Router();

router.post("/facility", auth("admin"), facultyControllers.createFaculty);

export const FacultyRoutes = router;
