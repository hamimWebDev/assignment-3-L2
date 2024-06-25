import express from "express";
import { userControllers } from "./UserController";

const router = express.Router();

router.post("/signup", userControllers.createUser);

export const userRoutes = router;
