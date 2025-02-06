import { closeDB, connectDB } from "../../config/database/dbConnection";
import sql, { MAX, RequestError } from "mssql";
import type { Role, userRole } from "../../models/rolModels";
import type { ErrorMessage } from "../../models/executionModel";

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

  /**
   *
   * @param userRoldData
   * @returns
   */
  async createUserRol(userRoldData: userRoles): Promise<string> {
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

      return result.output.ou_mensajeSalida;
    } catch (error) {
      //console.log("Primer error:", error);
      if (error instanceof RequestError) {
        //Debug
        // const errorMessages = {
        //   message: error.message, // Mensaje de error
        //   code: error.code,
        //   details: error.stack,
        // };

        // console.log("error sin parsear", error.message);
        // console.log("error parseado", JSON.parse(error.message));

        // console.error("Error en el registro:", error.message);

        throw new RequestError(error.message);
      }
      throw new Error("Error: " + error); // Lanzamos el error con un formato claro
    } finally {
      closeDB();
    }
  }

  /**
   * Función para obtener los roles y sus usuarios.
   * Esta función realiza una consulta a la base de datos utilizando un procedimiento almacenado
   * y devuelve un array de objetos que representan los roles y sus usuarios.
   *
   * @async
   * @function gettingAllRolesUsersData
   * @returns {Promise<Role[]>} Una promesa que resuelve en un array de objetos `Role`.
   * @throws {Error} Si ocurre un error durante la ejecución de la consulta o el procesamiento de los datos.
   *
   * .
   */

  async gettingAllRolesUsersData(): Promise<Role[]> {
    const pool = await connectDB();
    try {
      const result = await pool
        .request()
        .output("ou_databaseResponse", sql.VarChar(MAX))
        .execute("SP_BUSCAR_ROLESUSUARIODATA");
      // console.log(
      //   "Resultado de la consulta",
      //   JSON.parse(result.output.ou_databaseResponse)
      // );
      const response = JSON.parse(result.output.ou_databaseResponse);
      const RolesData: Role[] = JSON.parse(response.Roles).map((role: any) => ({
        id: role.ID_ROL,
        name: role.NOMBRE_ROL,
        menu: role.PESTAÑAS,
      }));
      console.log("Relacion de los roles", RolesData);
      return RolesData;
    } catch (error) {
      if (error instanceof RequestError) {
      }
      throw new Error("Error: " + error);
    } finally {
      closeDB();
    }
  }
}
