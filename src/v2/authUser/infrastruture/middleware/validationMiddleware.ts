/**
 * Middleware para validación de datos con Valibot
 */
import type { Request, Response, NextFunction } from "express";
import {
  validateLoginData,
  validateRegisterData,
  validateResetToken,
  validatePasswordResetUtil,
  validatePasswordResetRequestUtil,
} from "../../domain/schemas/validationUtils.js";

/**
 * Middleware para validar datos de inicio de sesión
 */
export const validateLogin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const validation = validateLoginData(email, password);
  if (!validation.isValid) {
    res.status(400).json({
      error: "Datos de inicio de sesión",
      details: validation.errors,
    });
    return;
  }

  next();
};

/**
 * Middleware para validar datos de registro
 */
export const validateRegister = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userData = req.body;

  const validation = validateRegisterData(userData);
  if (!validation.isValid) {
    res.status(400).json({
      error: "Datos de registro inválidos",
      details: validation.errors,
    });
    return;
  }

  // Asignar los datos validados al body
  req.body = validation.data;
  next();
};

/**
 * Middleware para validar solicitud de restablecimiento de contraseña
 */
export const validatePasswordResetRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.body;

  const validation = validatePasswordResetRequestUtil(email);
  if (!validation.isValid) {
    res.status(400).json({
      error: "Correo electrónico inválido",
      details: validation.errors,
    });
    return;
  }

  next();
};

/**
 * Middleware para validar token de restablecimiento
 */
export const validateTokenReset = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;

  const validation = validateResetToken(token);
  if (!validation.isValid) {
    res.status(400).json({
      error: "Token inválido",
      details: validation.errors,
    });
  }

  next();
};

/**
 * Middleware para validar restablecimiento de contraseña
 */
export const validatePasswordReset = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Erorr en validatePasswordReset");
  const { email, newPassword } = req.body;

  const validation = validatePasswordResetUtil(email, newPassword);
  if (!validation.isValid) {
    res.status(400).json({
      error: "Datos para restablecer contraseña inválidos",
      details: validation.errors,
    });
    return;
  }

  next();
};
