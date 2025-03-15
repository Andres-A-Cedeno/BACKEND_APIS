import { Router } from "express";
import { departmentController } from "../controllers/departmentController";

export const exampleRoutes = Router();

const departmentControl = new departmentController();

exampleRoutes.get("/", departmentControl.getDepartments);

export default exampleRoutes;
