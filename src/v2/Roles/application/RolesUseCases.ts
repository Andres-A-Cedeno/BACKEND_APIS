import type { IRoles } from "../domain/interfaces/IRoles";

export class RolesUseCases {
  constructor(private rolesRepository: IRoles) {}

  async createRoles(rolName: string, menuRol?: string[]) {
    console.log("Get it Application ", {
      rolName,
      menuRol,
    });

    return this.rolesRepository.create(rolName, menuRol);
  }

  async getRoles() {
    return this.rolesRepository.read();
  }

  async updateRoles(idRol: number, rolName: string, menuRol?: string[]) {
    return this.rolesRepository.update(idRol, rolName, menuRol);
  }

  async deleteRoles(idRol: number) {
    return this.rolesRepository.delete(idRol);
  }
}
