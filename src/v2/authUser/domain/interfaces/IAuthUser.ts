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
}
