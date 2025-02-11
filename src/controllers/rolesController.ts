import { _stringify, type ArgsAction } from "valibot";
import type { Role, userRole } from "../models/rolModels";
import { rolesService } from "../services/rolesService";
import type { Request, Response } from "express";
import { RequestError } from "mssql";

export class rolesController {
  rolService = new rolesService();

  construnctor() {
    this.rolService = new rolesService();
  }

  createRoleController = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    const roleData: Role = req.body;

    try {
      const result = await this.rolService.createRole(roleData);
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
      const result = await this.rolService.updateRole(roleData);
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

      const result = await this.rolService.createUserRole(userRoles);
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

  getAllRolesUsersData = async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const RoleData = req.body;
      const rolesUsersData = await this.rolService.getAllRolesUsersData(
        RoleData
      );
      return res.status(200).json(rolesUsersData);
    } catch (error) {
      if (error instanceof Error) {
        const errorMes = new RequestError(error.message);
        console.error(
          "Error en el registro este Controller:",
          errorMes.message
        );
        return res
          .status(401)
          .json({ error3: JSON.stringify(errorMes.message) });
      }
      return res.status(401).json({ error4: error });
    }
  };
}
