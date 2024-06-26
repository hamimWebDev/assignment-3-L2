import { Router } from "express";
import { userRoutes } from "../app/modules/User/UserRoutes";
import { LoginRoutes } from "../app/modules/Login/LoginRoute";
import { FacultyRoutes } from "../app/modules/Facility/FacilityRoutes";

export const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: userRoutes,
  },
  {
    path: "/auth",
    route: LoginRoutes,
  },
  {
    path: "/auth",
    route: FacultyRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
