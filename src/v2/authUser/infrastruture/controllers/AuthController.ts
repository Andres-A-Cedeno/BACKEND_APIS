import type { Request, Response } from "express";
import { CreateAuthUser } from "../../application/CreateOrLogin.js";
import {
  validateLoginData,
  validateRegisterData,
  validatePasswordResetRequestUtil,
  validateResetToken,
  validatePasswordResetUtil,
} from "../../domain/schemas/validationUtils.js";

export class AuthController {
  private createAuthUser: CreateAuthUser;

  constructor(createAuthUser: CreateAuthUser) {
    this.createAuthUser = createAuthUser;
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Validar datos con Valibot
      const validation = validateLoginData(email, password);
      if (!validation.isValid) {
        res.status(400).json({
          error: "Datos de inicio de sesión error",
          details: validation.errors,
        });
        return;
      }

      const user = await this.createAuthUser.login(email, password);
      res.status(200).json(user);
    } catch (error) {
      // console.error("❌ ERROR: Error al iniciar sesion", error);
      res.status(401).json({ error: "Email o contraseñas invalidas" });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const userParams = req.body;

      // Validar datos con Valibot
      const validation = validateRegisterData(userParams);
      if (!validation.isValid) {
        res.status(400).json({
          error: "Datos de registro inválidos",
          details: validation.errors,
        });
        return;
      }

      const user = await this.createAuthUser.register(validation.data!);

      res.status(200).json(user);
    } catch (error: any) {
      res.status(401).json({
        error: error.message,
      });
    }
  }

  /**
   * Solicita un restablecimiento de contraseña para el usuario
   * @param req Request con el email del usuario
   * @param res Response con el mensaje de confirmación
   */
  async requestPasswordReset(req: Request, res: Response) {
    try {
      const { email } = req.body;

      // Validar email con Valibot
      const validation = validatePasswordResetRequestUtil(email);
      if (!validation.isValid) {
        res.status(400).json({
          error: "Correo electrónico inválido",
          details: validation.errors,
        });
        return;
      }

      const result = await this.createAuthUser.requestPasswordReset(email);
      res.status(200).json(result);
    } catch (error: any) {
      console.error(
        "❌ ERROR: Error al solicitar restablecimiento de contraseña",
        error
      );
      res.status(400).json({
        error:
          error.message || "Error al solicitar restablecimiento de contraseña",
      });
    }
  }

  /**
   * Verifica si el token de restablecimiento es válido
   * @param req Request con el token de restablecimiento
   * @param res Response con la información del usuario
   */
  async verifyResetToken(req: Request, res: Response) {
    try {
      const { token } = req.params;

      // Validar token con Valibot
      const validation = validateResetToken(token);
      if (!validation.isValid) {
        res.status(400).json({
          error: "Token inválido",
          details: validation.errors,
        });
        return;
      }

      const result = await this.createAuthUser.verifyResetToken(token);
      res.status(200).json(result);
    } catch (error: any) {
      console.error(
        "❌ ERROR: Error al verificar token de restablecimiento",
        error
      );
      res.status(400).json({
        error: error.message || "Token inválido o expirado",
      });
    }
  }

  /**
   * Actualiza la contraseña del usuario después de la verificación del token
   * @param req Request con el email y la nueva contraseña
   * @param res Response con el mensaje de confirmación
   */
  async resetPassword(req: Request, res: Response) {
    try {
      const { email, newPassword } = req.body;

      // Validar datos con Valibot
      const validation = validatePasswordResetUtil(email, newPassword);
      if (!validation.isValid) {
        res.status(400).json({
          error: "Datos para restablecer contraseña inválidos",
          details: validation.errors,
        });
        return;
      }

      const result = await this.createAuthUser.resetPassword(
        email,
        newPassword
      );
      res.status(200).json(result);
    } catch (error: any) {
      console.error("❌ ERROR: Error al restablecer contraseña", error);
      res.status(400).json({
        error: error.message || "Error al restablecer contraseña",
      });
    }
  }
}
