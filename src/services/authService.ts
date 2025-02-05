import { generateToken } from "../utils/jwtUtils";
import type { UserLogin, UserRegister } from "../models/users/userModel";
// import type { UserLogin } from "../schemas/authSchema";
import { authRepository } from "../repositories/userRepository";
import { compare } from "bcrypt";

export const registerUserService = async (
  userData: UserRegister
): Promise<string> => {
  try {
    console.log("Obtenido del controlador", userData);
    const result = await new authRepository().registerUser(userData);

    return result;
  } catch (error) {
    if (error instanceof Error) {
      // console.error("aa" + error.message);
      throw new Error(error.message);
    } else {
      // console.error("Error en el registro:", error);
      throw new Error("Error en el registro.");
    }
  }
};

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

    const userHashPassword = await new authRepository().LoginUser(userData);

    if (!userHashPassword) {
      throw new Error("Usuario no encontrado");
    }
    const passwordMatch = await compare(password, userHashPassword);
    if (!passwordMatch) {
      throw new Error("Contraseña incorrecta");
    }

    console.log("Email Obtenido" + email);

    console.log("Contraseña Obtenida" + userHashPassword);

    const { accessToken, refreshToken } = generateToken(
      email,
      userHashPassword
    );

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Error en" + error);
  }
};
