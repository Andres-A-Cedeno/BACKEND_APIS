import {
  loginUserService,
  registerUserService,
} from "../../services/authService";
import type { UserLogin, UserRegister } from "../../schemas/authSchema";
import type { Request, Response } from "express";

export const registerUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: UserRegister = req.body;

  try {
    const result = await registerUserService(userData);
    return res.status(200).json({
      message: result,
      data: userData,
    });
  } catch (error) {
    //console.error("Error en el registro:", error);
    if (error instanceof Error) {
      // console.error("Error en el registro:", error.message);
      return res.status(400).json({ message: error.message });
    }
    return res.status(400).json({ message: error });
  }
};

/**
 * @async
 * @param req
 * @param res
 * @returns {Promise<Response>}
 */

export const loginUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: UserLogin = req.body;

  try {
    // Llamamos al servicio de login
    const tokens = await loginUserService(userData);
    // Retornamos los tokens de acceso y refresco
    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    });
  } catch (error) {
    console.error("Error en el login:", error);
    return res.status(400).json({ message: "Error en el login." + error });
  }
};
