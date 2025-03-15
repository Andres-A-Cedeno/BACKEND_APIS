import type { Request, Response } from "express";
import { CreateAuthUser } from "../../application/CreateOrLogin.js";

export class AuthController {
  private createAuthUser: CreateAuthUser;

  constructor(createAuthUser: CreateAuthUser) {
    this.createAuthUser = createAuthUser;
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      /**
       * Validate that the email and password are not empty
       */
      if (!email || !password) {
        res.status(400).json({ error: "Email y contraseña son obligatorios" });
      }

      const user = await this.createAuthUser.login(email, password);
      res.status(200).json(user);
    } catch (error) {
      // console.error("❌ ERROR: Error al iniciar sesion", error);
      res.status(401).json({ error: "Email o contraseñas invalidas" });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const userParams = req.body;
      //Validate that the userParams are not empty
      // console.log("User data get it Controller", userParams);
      const user = await this.createAuthUser.register(userParams);

      res.status(200).json(user);
    } catch (error: any) {
      res.status(401).json({
        error: error.message,
      });
    }
  }
}
