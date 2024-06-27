import express from "express";
import { userControllers } from "./UserController";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.post("/signup", userControllers.createUser);
router.get("/users", auth("admin"), userControllers.getAllUsers);

export const userRoutes = router;
