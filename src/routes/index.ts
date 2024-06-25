import { Router } from "express";
import { userRoutes } from "../app/modules/User/UserRoutes";

export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: userRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
