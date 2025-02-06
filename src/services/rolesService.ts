import { rolesRepository } from "../repositories/roles/rolesRepository";
import type { Role, userRole } from "../models/rolModels";
import { RequestError } from "mssql";

interface userRoles extends Array<userRole> {}
export class rolesService {
  private rolsRepository: rolesRepository;

  constructor() {
    this.rolsRepository = new rolesRepository();
  }
  // const rolsRepository = new rolesRepository();

  async createRole(roleData: Role): Promise<string> {
    try {
      const result = await this.rolsRepository.createRole(roleData);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error: " + error);
    }
  }

  async updateRole(roleData: Role): Promise<string> {
    try {
      const result = await this.rolsRepository.updateRole(roleData);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error: " + error);
    }
  }

  async createUserRole(userRoleData: userRoles): Promise<string> {
    try {
      const result = await this.rolsRepository.createUserRol(userRoleData);
      return result;
    } catch (error) {
      //console.error("Error en el registro Servicio:", error);
      throw error;
    }
  }

  async getAllRolesUsersData(RoleData: any): Promise<Role[]> {
    //const rolsData = JSON.stringify(RoleData);

    try {
      const result = await this.rolsRepository.gettingAllRolesUsersData(
        RoleData
      );
      return result;
    } catch (error) {
      if (error instanceof RequestError) {
        const errorMes = new RequestError(error.message);
        console.error(
          "Error en el registro este Controller:",
          errorMes.message
        );
        throw new RequestError(error.message);
      }
      throw new Error("Error: " + error);
    }
  }
}
