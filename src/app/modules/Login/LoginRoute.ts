import express from "express";
import { LoginControllers } from "./LoginController";
import { validateRequest } from "../middlewares/validateRequest";
import { LoginValidation } from "./LoginValidation";

const router = express.Router();

router.post("/login", LoginControllers.loginUser);
router.post(
  "/refresh-token",
  validateRequest(LoginValidation.refreshTokenValidationSchema),
  LoginControllers.refreshToken,
);

export const LoginRoutes = router;
