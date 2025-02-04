import { closeDB, connectDB } from "../../config/database/dbConnection";
import sql from "mssql";
import type { Role, userRole } from "../../models/rolModels";
import { json } from "express";

interface userRoles extends Array<userRole> {}

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

  async createUserRol(
    userRoldData: userRoles
  ): Promise<{ message: string; errorVariable: string }[]> {
    //Inicializamos la conexion a la base de datos
    const pool = await connectDB();

    try {
      const DataParsed = JSON.stringify(userRoldData);
      console.log("Informacion parseada" + DataParsed);

      const result = await pool
        .request()
        .input("ou_rolesUsuarios", sql.VarChar, DataParsed)
        .output("ou_mensajeSalida", sql.VarChar(500))
        .output("ou_errorVariable", sql.VarChar(500))
        .execute("SP_CREARACTUALIZAR_ROLUSUARIO");

      const mensajeSalida: string = result.output.ou_mensajeSalida;
      const errorVariable: string = result.output.ou_errorVariable;

      // Devolvemos un array con los objetos que contienen el mensaje y la variable de error
      return [
        {
          message:
            (mensajeSalida as string) ||
            "Usuario y rol actualizados correctamente",
          errorVariable: errorVariable || "No hay error",
        },
      ];
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("" + error);
    } finally {
      closeDB();
    }
  }
}
