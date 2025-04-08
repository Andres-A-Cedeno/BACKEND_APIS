import { Router } from "express";
import { RolesController } from "./infrastructure/controllers/RolesController.js";
import { RolesUseCases } from "./application/RolesUseCases.js";
import { RolesRepository } from "./infrastructure/repository/RolesRepository.js";

const rolesRoutes = Router();

const rolesUseCases = new RolesUseCases(new RolesRepository());
const rolesController = new RolesController(rolesUseCases);

rolesRoutes.post("/roles", rolesController.createRoles.bind(rolesController));
rolesRoutes.post("/getRoles", rolesController.getRoles.bind(rolesController));
export default rolesRoutes;
