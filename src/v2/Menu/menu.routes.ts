import { Router } from "express";
import { MenuController } from "./infrastructure/controllers/MenuController";
import { MenuUseCases } from "./application/MenuUseCases";
import { MenuRepository } from "./infrastructure/repositories/MenuRepository";
import { authMiddleware } from "../authUser/infrastruture/middleware/validationMiddleware";
//Complete all the components

const menuRoutes = Router();

const menuUseCases = new MenuUseCases(new MenuRepository());
const menuController = new MenuController(menuUseCases);
menuRoutes.use(authMiddleware);
menuRoutes.post("/menu", menuController.getMenu.bind(menuController));

export default menuRoutes;
