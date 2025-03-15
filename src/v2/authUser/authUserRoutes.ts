import { Router } from "express";
import { AuthController } from "./infrastruture/controllers/AuthController";
import { CreateAuthUser } from "./application/CreateOrLogin";
import { AuthUserRepositoty } from "./infrastruture/repositories/AuthUserRepository";

const authRoutes = Router();
const createAuthUser = new CreateAuthUser(new AuthUserRepositoty());
const authController = new AuthController(createAuthUser);

//Definir las rutas
authRoutes.post("/login", authController.login.bind(authController));
authRoutes.post("/register", authController.register.bind(authController));

export default authRoutes;
