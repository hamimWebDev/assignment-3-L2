import express from "express";
import { PaymentControllers } from "./PaymentController";

const router = express.Router();

router.post("/confirmation", PaymentControllers.confirmationController)

export const PaymentsRoutes = router;
