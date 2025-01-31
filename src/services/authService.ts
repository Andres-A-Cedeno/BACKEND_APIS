import { generateToken } from "../utils/jwtUtils";
import type { UserLogin } from "../models/users/userModel";
// import type { UserLogin } from "../schemas/authSchema";
import { authLoginSchema } from "../schemas/authSchema";
import { safeParse } from "valibot";
import { UserRepository } from "../repositories/userRepository";
import { compare } from "bcrypt";

/**
 * Función para realizar el login de un usuario.
 * @param userData Datos del usuario (email y contraseña).
 * @returns Los tokens de acceso (accessToken y refreshToken) si las credenciales son correctas.
 */
export const loginUserService = async (
  userData: UserLogin
): Promise<{ accessToken: string; refreshToken: string }> => {
  //compare the userData
  try {
    const { email, password } = userData;
    const userHashPassword = await new UserRepository().LoginUser(userData);

    if (!userHashPassword) {
      throw new Error("Usuario no encontrado");
    }
    const passwordMatch = await compare(password, userHashPassword);
    if (!passwordMatch) {
      throw new Error("Contraseña incorrecta");
    }

    const { accessToken, refreshToken } = generateToken(
      email,
      userHashPassword
    );

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Error en" + error);
  }
};
