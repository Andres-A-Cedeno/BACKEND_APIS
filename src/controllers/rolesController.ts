import type { Role } from "../models/rolModels";
import { rolesService } from "../services/rolesService";
import type { Request, Response } from "express";

export class rolesController {
  createRoleController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const roleData: Role = req.body;

    try {
      const result = await new rolesService().createRole(roleData);
      return res.status(200).json({
        message: result,
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

  updadateRoleController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const roleData: Role = req.body;

    try {
      const result = await new rolesService().updateRole(roleData);
      return res.status(200).json({
        message: result,
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

  createUserRoleController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const result = await new rolesService().createUserRole(req.body);
      return res.status(200).json({
        message: result,
      });
    } catch (error) {
      if (error instanceof Error) {
        // console.error("Error en el registro:", error.message);
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: error });
    }
  };
}
