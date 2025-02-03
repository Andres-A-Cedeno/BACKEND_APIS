import { rolesRepository } from "../repositories/roles/rolesRepository";
import type { Role, userRole } from "../models/rolModels";

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

  async createUserRole(
    userRoleData: userRole
  ): Promise<{ message: string; errorVariable: string }[]> {
    console.log(userRoleData);

    try {
      const result = await this.rolsRepository.createUserRol(userRoleData);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error desconocido" + error);
    }
  }
}
