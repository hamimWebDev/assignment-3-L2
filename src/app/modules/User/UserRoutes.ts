import express from "express";
import { userControllers } from "./UserController";
import { auth } from "../middlewares/auth";

const router = express.Router();

router.post("/signup", userControllers.createUser);
router.put("/user/:id", userControllers.updateAUserIntoDB);
router.delete("/user/:id", auth("admin"), userControllers.deleteUserFromDB);
router.get("/users", auth("admin"), userControllers.getAllUsers);

export const userRoutes = router;
