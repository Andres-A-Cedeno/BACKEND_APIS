import { RolesResponse } from "../../infrastructure/repository/RolesRepository";
import { RoleModel } from "../entities/RolesEntity";

export interface IRoles {
  create(rolName: string, menuRoles?: string[]): Promise<{ message: string }>;

  //Considerar que le metodo de read, solo es recuperar información
  read(): Promise<RoleModel[]>;
  update(
    idRol: number,
    rolName: string,
    menuRoles?: string[]
  ): Promise<RoleModel>;

  //Considerar que el metodo de delete, solo es para desactivar el rol información
  delete(idRol: number): Promise<{ message: string }>;

  getUserRoles(): Promise<RolesResponse[]>;
}
