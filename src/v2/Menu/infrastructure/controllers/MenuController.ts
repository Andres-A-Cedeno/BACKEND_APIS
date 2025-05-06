import type { Request, Response } from "express";

import { MenuUseCases } from "../../application/MenuUseCases";
import { JwtService } from "../../../Security/Jwt/JwtService";

export class MenuController {
  constructor(private menuUseCases: MenuUseCases) {
    this.menuUseCases = menuUseCases;
  }

  async getMenu(req: Request, res: Response) {
    console.log(req.headers.authorization);
    try {
      //console.log(req.headers.authorization);
      // Verificar el token de acce

      const decoded: { dni: string; email: string } = JwtService.verifyToken(
        req.headers.authorization?.split(" ")[1]!
      );

      const menus = await this.menuUseCases.getMenu(parseInt(decoded.dni));
      res.status(200).json(menus);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
