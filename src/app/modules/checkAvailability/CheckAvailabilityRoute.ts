import express from "express";
import { CheckAvailabilityController } from "./CheckAvailabilityController";

const router = express.Router();

router.get("/", CheckAvailabilityController.getCheckAvailability);

export const checkAvailabilityRoutes = router;
