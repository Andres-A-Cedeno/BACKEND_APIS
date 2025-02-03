import { Router } from "express";
import { authenticateToken } from "../middleware/authentication";
import { rolesController } from "../controllers/rolesController";

export const protectedRoutes = Router();

const rolController = new rolesController();

protectedRoutes.post(
  "/createRole",
  authenticateToken,
  rolController.createRoleController
);
protectedRoutes.put(
  "/updateRole",
  authenticateToken,
  rolController.updadateRoleController
);

export default protectedRoutes;
