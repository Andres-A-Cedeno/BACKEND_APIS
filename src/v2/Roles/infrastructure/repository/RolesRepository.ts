import { Connection } from "../../../server/database/Connection";
import type { IRoles } from "../../domain/interfaces/IRoles";
import { RoleModel } from "../../domain/entities/RolesEntity";
import sql, { MAX } from "mssql";
import { TypeProcess } from "../../../enums/typeProcess";

interface Screens {
  name: string;
}

interface User {
  fullName: string;
}

export interface RolesResponse {
  nameRol: string;
  screens: Screens;
  users: User;
}

interface RawRoleData {
  nameRol: string;
  screens?: { name: string }[];
  users?: { fullName: string }[];
}

export class RolesRepository implements IRoles {
  private pool!: sql.ConnectionPool;

  constructor() {
    Connection.connect().then((pool) => {
      this.pool = pool;
    });
  }

  async create(
    rolName: string,
    menuRoles?: string[]
  ): Promise<{ message: string }> {
    try {
      //verifica all data
      const result = await this.pool
        .request()
        .input("ou_idRol", sql.VarChar, null)
        .input("ou_nombreRol", sql.VarChar, rolName)
        .input("ou_accion", sql.VarChar, "CREAR")
        .input("ou_menu", sql.VarChar(MAX), menuRoles)
        .output("ou_mensajeSalida", sql.VarChar(500))
        .execute("SP_CREARACTUALIZAR_ROL");

      return { message: result.output.ou_mensajeSalida };
    } catch (error) {
      throw new Error("No se pudo obtener los roles");
    }
  }

  async read(): Promise<RoleModel[]> {
    try {
      const result = await this.pool
        .request()
        .input("ou_tipoProceso", sql.VarChar, TypeProcess.GET)
        .execute("SP_BUSCAR_ROL");

      //console.log("Resultado de la consulta", result.recordset[0]);

      // Extraer la clave con el JSON
      const jsonKey = Object.keys(result.recordset[0])[0];
      // console.log("jsonKey", jsonKey);

      // Convertir la cadena JSON en un array de objetos
      const rolesData = JSON.parse(result.recordset[0][jsonKey]);

      //  Mapear correctamente los datos a `RoleModel`
      const roles: RoleModel[] = rolesData.map(
        (rol: {
          idRol: number;
          nameRol: string;
          menu: { idMenu: number; nameScreens: string }[];
        }) => new RoleModel(rol.nameRol, rol.idRol, rol.menu)
      );

      return roles;
    } catch (error) {
      console.error("❌ ERROR en el repository de roles", error);
      throw new Error("No se pudo obtener los roles");
    }
  }

  /**
   *
   * @param idRol
   * @param rolName
   * @param menuRoles
   * @returns
   */
  async update(
    idRol: number,
    rolName: string,
    menuRoles?: string[]
  ): Promise<RoleModel> {
    return new RoleModel(rolName);
  }

  async delete(idRol: number): Promise<{ message: string }> {
    return { message: "Rol desactivado correctamente" };
  }

  async getUserRoles(): Promise<RolesResponse[]> {
    const result = await this.pool
      .request()
      .input("ou_tipoProceso", sql.VarChar, TypeProcess.READ)
      .execute("SP_BUSCAR_ROL");

    const jsonKey = Object.keys(result.recordset[0])[0];
    const rolesData = JSON.parse(result.recordset[0][jsonKey]);

    const roles: RolesResponse[] = rolesData.map((rol: RawRoleData) => {
      const screens = Array.isArray(rol.screens)
        ? rol.screens.map((s) => s.name)
        : [];
      const users = Array.isArray(rol.users)
        ? rol.users.map((u) => u.fullName)
        : [];

      return {
        nameRol: rol.nameRol,
        screens,
        users,
      };
    });

    console.log("roles", roles);
    return roles;
  }
}
