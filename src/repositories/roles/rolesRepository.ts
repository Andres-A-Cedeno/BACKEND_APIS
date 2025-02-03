import { closeDB, connectDB } from "../../config/database/dbConnection";
import sql from "mssql";
import type { Role, userRole } from "../../models/rolModels";

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
    userRoldData: userRole
  ): Promise<{ message: string; errorVariable: string }[]> {
    //Inicializamos la conexion a la base de datos
    const pool = await connectDB();

    // const Data: userRole[] = {
    //   idrol: "",
    //   iduser: "1",
    // };

    try {
      const data = JSON.stringify(userRoldData);

      const result = await pool
        .request()
        .input("ou_rolesUsuarios", sql.VarChar, data)
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
