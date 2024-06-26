import express from "express";
import { LoginControllers } from "./LoginController";

const router = express.Router();

router.post("/login", LoginControllers.loginUser);

export const LoginRoutes = router;
