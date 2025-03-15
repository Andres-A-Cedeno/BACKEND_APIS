import type { User } from "../models/users/userModel";
import { authRepository } from "../repositories/userRepository";

export class userService {
  private userRepo: authRepository;

  constructor() {
    this.userRepo = new authRepository();
  }

  /**
   * Obtiene todos los usuarios activos.
   * @returns {Promise<User[]>} Lista de usuarios activos.
   */
  async getAllUsers(): Promise<User[]> {
    try {
      const result = await this.userRepo.getActiveUsers();
      return result;
    } catch (error) {
      throw new Error("Error en la consulta: " + error);
    }
  }
}
