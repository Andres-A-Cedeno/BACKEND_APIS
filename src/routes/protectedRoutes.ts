import { Router } from "express";
import { authenticateToken } from "../middleware/authentication";
import { rolesController, departmentController } from "../controllers";

export const protectedRoutes = Router();

const rolController = new rolesController();
const department = new departmentController();

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

protectedRoutes.post(
  "/createUserRole",
  //authenticateToken,
  rolController.createUserRoleController
);

protectedRoutes.get(
  "/getDepartments",
  //authenticateToken,
  department.getDepartments
);

export default protectedRoutes;
