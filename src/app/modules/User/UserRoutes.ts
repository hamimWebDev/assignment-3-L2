import express from "express";
import { userControllers } from "./UserController";
import { auth } from "../Middlewares/Auth";

const router = express.Router();

router.post("/signup", userControllers.createUser);
router.get("/users", auth("admin"), userControllers.getAllUsers);

export const userRoutes = router;
