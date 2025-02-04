import { _stringify, type ArgsAction } from "valibot";
import type { Role, userRole } from "../models/rolModels";
import { rolesService } from "../services/rolesService";
import type { Request, Response } from "express";
import { RequestError } from "mssql";

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
      interface userRoles extends Array<userRole> {}
      const userRoles: userRoles = req.body;

      const result = await new rolesService().createUserRole(userRoles);
      return res.status(200).json({
        message: result,
      });
    } catch (error) {
      //console.error("Error en el registro:", error);

      if (error instanceof RequestError) {
        const errorMes = new RequestError(error.message);
        console.error(
          "Error en el registro este Controller:",
          errorMes.message
        );
        return res.status(401).json({ error: JSON.parse(errorMes.message) });
      }
      return res.status(401).json({ error });
    }
  };
}
