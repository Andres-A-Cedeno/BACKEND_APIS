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
): Promise<{ accessToken: string; refreshToken: string; userInfo: object }> => {
  //compare the userData
  try {
    const { email, password } = userData;

    const userRecovered = await new authRepository().LoginUser(userData);

    const userInfo = {
      cedula: userRecovered.CPU_CEDULA,
      nombre: userRecovered.CPU_NOMBRE,
      apellido: userRecovered.CPU_APELLIDO,
      nickname: userRecovered.CPU_NICKNAME,
      correo: userRecovered.CPU_CORREO,
      id_rol: userRecovered.CPR_ID,
      id_depto: userRecovered.CPD_ID,
    };

    const userHashPassword = userRecovered.CPU_CONTRASENA;

    if (!userHashPassword) {
      throw new Error("NonExistentUser");
    }
    const passwordMatch = await compare(password, userHashPassword);
    if (!passwordMatch) {
      throw new Error("WrongPassword" + 401);
    }

    console.log("Email Obtenido" + email);

    console.log("Contraseña Obtenida" + userHashPassword);

    const { accessToken, refreshToken } = generateToken(
      email,
      userHashPassword
    );

    return { accessToken, refreshToken, userInfo };
  } catch (error) {
    throw new Error("" + error);
  }
};
