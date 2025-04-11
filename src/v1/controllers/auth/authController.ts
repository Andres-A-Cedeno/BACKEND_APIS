import {
  infoUserService,
  loginUserService,
  registerUserService,
} from "../../services/authService";
import type { UserLogin, UserRegister } from "../../schemas/authSchema";
import type { Request, Response } from "express";
import type { Type } from "typescript";

export const registerUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userData: UserRegister = req.body;

  console.log("Obtenido del frontend", userData);

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

    res.cookie;
    return res.status(200).json({
      message: "Inicio de sesión exitoso",
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        userinfo: tokens.userInfo,
      },
    });
  } catch (error: any) {
    console.error("Error en el login:", error);
    const errorcode = error.message.slice(-3);
    console.log(errorcode);
    if (errorcode === "401") {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
    return res.status(400).json({ message: "Error en el login." + error });
  }
};

export const infoUserController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const token: any = req.body;

  try {
    const info = await infoUserService(token);
    return res.status(200).json(info);
  } catch (error: any) {
    console.log("error getting userInfo", error);
    return res.status(400).json({ message: "Error en el user-info" + error });
  }
};
