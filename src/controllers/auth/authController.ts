import { loginUser } from "../../services/authService";
import type { UserLogin } from "../../schemas/authSchema";
import type { Request, Response } from "express";

export const loginUserController = async (req: Request, res: Response) => {
  const userData: UserLogin = req.body;

  try {
    // Llamamos al servicio de login
    const tokens = await loginUser(userData);

    console.log(tokens);

    // Retornamos los tokens de acceso y refresco
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(400).json({ message: "Error en el login." });
  }
};
