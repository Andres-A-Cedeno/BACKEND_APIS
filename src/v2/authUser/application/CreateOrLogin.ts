import type { IAuthUser } from "../domain/interfaces/IAuthUser.js";
import type { IUserRegister } from "../domain/interfaces/IUserRegister.js";

export class CreateAuthUser {
  constructor(private authRepository: IAuthUser) {}

  async login(email: string, password: string) {
    return await this.authRepository.login(email, password);
  }

  async register(registerData: IUserRegister) {
    // console.log("User data get it Application", registerData);
    return await this.authRepository.register(registerData);
  }

  /**
   * Solicita un restablecimiento de contraseña para el usuario
   * @param email Correo electrónico del usuario
   * @returns Mensaje de confirmación
   */
  async requestPasswordReset(email: string) {
    return await this.authRepository.requestPasswordReset(email);
  }

  /**
   * Verifica si el token de restablecimiento es válido
   * @param token Token de restablecimiento
   * @returns Información del usuario asociado al token
   */
  async verifyResetToken(token: string) {
    return await this.authRepository.verifyResetToken(token);
  }

  /**
   * Actualiza la contraseña del usuario después de la verificación del token
   * @param email Correo electrónico del usuario
   * @param newPassword Nueva contraseña del usuario
   * @returns Mensaje de confirmación
   */
  async resetPassword(email: string, newPassword: string) {
    return await this.authRepository.resetPassword(email, newPassword);
  }
}
