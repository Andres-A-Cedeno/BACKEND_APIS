import { Router } from "express";
import { AuthController } from "./infrastruture/controllers/AuthController.js";
import { CreateAuthUser } from "./application/CreateOrLogin.js";
import { AuthUserRepositoty } from "./infrastruture/repositories/AuthUserRepository.js";
import {
  validateLogin,
  validateRegister,
  validatePasswordResetRequest as validateResetRequest,
  validateTokenReset,
  validatePasswordReset,
} from "./infrastruture/middleware/validationMiddleware.js";

const authRoutes = Router();
const createAuthUser = new CreateAuthUser(new AuthUserRepositoty());
const authController = new AuthController(createAuthUser);

//Definir las rutas
authRoutes.post(
  "/login",
  validateLogin,
  authController.login.bind(authController)
);

authRoutes.post(
  "/register",
  validateRegister,
  authController.register.bind(authController)
);

// Rutas para recuperación de contraseña
authRoutes.post(
  "/password-reset",
  validateResetRequest,
  authController.requestPasswordReset.bind(authController)
);

authRoutes.get(
  "/password-reset/:token",
  validateTokenReset,
  authController.verifyResetToken.bind(authController)
);

authRoutes.post(
  "/password-reset/update",
  validatePasswordReset,
  authController.resetPassword.bind(authController)
);

export default authRoutes;
