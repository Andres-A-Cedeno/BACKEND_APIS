import { rolesRepository } from "../repositories/roles/rolesRepository";
import type { Role } from "../models/rolModels";

export class rolesService {
  // const rolsRepository = new rolesRepository();

  async createRole(roleData: Role): Promise<string> {
    try {
      const result = await new rolesRepository().createRole(roleData);
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
      const result = await new rolesRepository().updateRole(roleData);
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error: " + error);
    }
  }
}
