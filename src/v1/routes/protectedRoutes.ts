import { request, Router } from "express";
import { authenticateToken } from "../middleware/authentication";
import { rolesController, departmentController } from "../controllers";
import { calendarController } from "../controllers/calendarController";
import { clientController } from "../controllers/clientController";
import { userController } from "../controllers/usersController";

export const protectedRoutes = Router();

const rolController = new rolesController();
const department = new departmentController();
const calendar = new calendarController();
const client = new clientController();
const userCtrl = new userController();

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

protectedRoutes.get("/users/active", userCtrl.getAllUsers.bind(userCtrl));

protectedRoutes.get("/getClientNames", client.getClientsList);

export default protectedRoutes;
