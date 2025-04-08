import { AuthUser } from "../entities/authUser.js";
import type { IUserRegister } from "./IUserRegister.js";

export interface IAuthUser {
  /**
   *
   * @param email -> Correo electronico del usuario
   * @param password -> Contraseña del usuario
   */
  login(email: string, password: string): Promise<AuthUser>;

  register(user: IUserRegister): Promise<{ message: string }>;

  logout(email: string): Promise<{ message: string }>;

  /**
   * Solicita un restablecimiento de contraseña para el usuario
   * @param email -> Correo electrónico del usuario
   * @returns Mensaje de confirmación
   */
  requestPasswordReset(email: string): Promise<{ message: string }>;

  /**
   * Verifica si el token de restablecimiento es válido
   * @param token -> Token de restablecimiento
   * @returns Información del usuario asociado al token
   */
  verifyResetToken(token: string): Promise<{ email: string }>;

  /**
   * Actualiza la contraseña del usuario después de la verificación del token
   * @param email -> Correo electrónico del usuario
   * @param newPassword -> Nueva contraseña del usuario
   * @returns Mensaje de confirmación
   */
  resetPassword(
    email: string,
    newPassword: string
  ): Promise<{ message: string }>;
}
