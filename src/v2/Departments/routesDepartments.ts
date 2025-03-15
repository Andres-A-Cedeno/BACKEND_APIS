import { Router } from "express";
import { DepartmentController } from "./infrastructure/controllers/DepartmentsController";
import { DepartmentsUseCases } from "./application/UseCases";
import { DepartmentRepository } from "./infrastructure/repositories/DepartmentsRepository";

const departmentRoutes = Router();
const departmentUseCases = new DepartmentsUseCases(new DepartmentRepository());
const departmentController = new DepartmentController(departmentUseCases);

/**
 * Define the routes to get the departments
 */
departmentRoutes.post(
  "/departments",
  departmentController.getDepartments.bind(departmentController)
);

export default departmentRoutes;
