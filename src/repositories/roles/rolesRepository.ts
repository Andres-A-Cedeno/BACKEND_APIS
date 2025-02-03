import { closeDB, connectDB } from "../../config/database/dbConnection";
import sql from "mssql";
import type { Role } from "../../models/rolModels";

export class rolesRepository {
  async createRole(roleData: Role): Promise<string> {
    const pool = await connectDB();
    try {
      const result = await pool
        .request()
        .input("ou_nombreRol", sql.VarChar, roleData.name)
        .input("ou_accion", sql.VarChar, "CREAR")
        .input("ou_menu", sql.VarChar, roleData.menu)
        .output("ou_mensajeSalida", sql.VarChar(500))
        .execute("SP_CREARACTUALIZAR_ROL");

      const response = result.output.ou_mensajeSalida;
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error: " + error);
    } finally {
      closeDB();
    }
  }

  async updateRole(roleData: Role): Promise<string> {
    const pool = await connectDB();
    try {
      const result = await pool
        .request()
        .input("ou_nombreRol", sql.VarChar, roleData.name)
        .input("ou_accion", sql.VarChar, "ACTUALIZAR")
        .input("ou_menu", sql.VarChar, roleData.menu)
        .output("ou_mensajeSalida", sql.VarChar(500))
        .execute("SP_CREARACTUALIZAR_ROL");

      const response = result.output.ou_mensajeSalida;
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error: " + error);
    } finally {
      closeDB();
    }
  }
}
