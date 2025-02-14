import { request, Router } from "express";
import { authenticateToken } from "../middleware/authentication";
import { rolesController, departmentController } from "../controllers";
import { calendarController } from "../controllers/calendarController";
import { clientController } from "../controllers/clientController";

export const protectedRoutes = Router();

const rolController = new rolesController();
const department = new departmentController();
const calendar = new calendarController();
const client = new clientController();

protectedRoutes.post(
  "/createRole",
  //authenticateToken,
  rolController.createRoleController
);
protectedRoutes.put(
  "/updateRole",
  //authenticateToken,
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

protectedRoutes.post(
  "/getRolesUsersData",
  //authenticateToken,
  rolController.getAllRolesUsersData
);

protectedRoutes.post("/getAllTask", calendar.getAllTask);
protectedRoutes.post("/createTask", calendar.createTask);

protectedRoutes.get("/getClientNames", client.getClientsList);

export default protectedRoutes;
