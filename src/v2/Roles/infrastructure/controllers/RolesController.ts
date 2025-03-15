import type { Request, Response } from "express";
import { RolesUseCases } from "../../application/RolesUseCases";

export class RolesController {
  constructor(private rolesUseCases: RolesUseCases) {
    this.rolesUseCases = rolesUseCases;
  }

  async createRoles(req: Request, res: Response) {
    try {
      const { rolName, menuRol } = req.body;

      //Validat that rolName is not empty
      if (!rolName) {
        throw new Error("El nombre del rol no puede estar vacío");
      }

      const roles = await this.rolesUseCases.createRoles(rolName, menuRol);
      res.status(200).json(roles);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getRoles(req: Request, res: Response) {
    try {
      const roles = await this.rolesUseCases.getRoles();
      res.status(200).json(roles);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
