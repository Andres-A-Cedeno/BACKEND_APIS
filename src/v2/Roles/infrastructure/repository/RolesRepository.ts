import { Connection } from "../../../server/database/Connection";
import type { IRoles } from "../../domain/interfaces/IRoles";
import { RoleModel } from "../../domain/entities/RolesEntity";
import sql, { MAX } from "mssql";
import type { Role } from "../../../../models/rolModels";

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
      const result = await this.pool.request().execute("SP_BUSCAR_ROL");

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
}
