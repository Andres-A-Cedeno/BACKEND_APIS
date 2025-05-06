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
import { JwtService } from "../../../Security/Jwt/JwtService.js";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Obtener el token de autorización

  console.log("Entrando en authMiddleware");

  const authHeader = req.headers;
  //console.log("authHeader", authHeader);
  const accessToken = authHeader.authorization?.split(" ")[1];

  // Obtener el refresh token (puede estar en cookies o en el header)
  const refreshToken =
    req.cookies?.refreshToken || req.headers["x-refresh-token"];

  console.log("Refresh", refreshToken);

  if (!accessToken) {
    return res.status(401).json({ error: "Token de acceso no proporcionado" });
  }

  try {
    // Intentar verificar el token de acceso
    const decoded = JwtService.verifyToken(accessToken);
    req.user = decoded; // Guardar los datos del usuario en la request
    next();
  } catch (error) {
    // Si el token de acceso es inválido o ha expirado, intentar renovarlo con el refresh token
    if (refreshToken) {
      try {
        const newAccessToken: {
          accessToken: string;
          refreshToken: string;
        } = JwtService.refreshAccessToken(refreshToken);

        const decoded = JwtService.verifyToken(newAccessToken.accessToken);
        req.user = decoded;

        // Enviar el nuevo token en la respuesta
        res.setHeader("access-token", newAccessToken.accessToken);
        res.setHeader("refresh-token", newAccessToken.refreshToken);

        next();
      } catch (refreshError) {
        // Si el refresh token también es inválido, devolver error de autenticación
        return res.status(401).json({
          error: "Sesión expirada. Por favor, inicie sesión nuevamente.",
        });
      }
    } else {
      return res.status(401).json({ error: "Token inválido o expirado" });
    }
  }
};

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
