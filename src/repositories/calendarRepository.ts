import { connectDB, closeDB } from "../config/database/dbConnection";
import sql, { MAX } from "mssql";

interface Task {
  message: string;
  data: string[];
}

export class calendarRepository {
  async getAllTask(): Promise<any> {
    const pool = await connectDB();
    try {
      const result = await pool
        .request()
        .input("ou_user_ci", sql.VarChar)
        .input("ou_ci_ruc", sql.VarChar)
        .input("ou_titulo", sql.VarChar)
        .input("ou_fecha_registro", sql.VarChar)
        .input("ou_tiempo_inicio", sql.VarChar)
        .input("ou_tiempo_final", sql.VarChar)
        .input("ou_proyecto", sql.VarChar)
        .input("ou_seccion", sql.VarChar)
        .input("ou_descripcion", sql.VarChar)
        .input("ou_accion", sql.VarChar, "OBTENER")
        .output("ou_databaseResponse", sql.VarChar(MAX))
        .execute("SP_CREARACTUALIZAR_ACTIVIDADES");
      console.log(result.recordset);
      return result.recordset;
    } catch (error) {
      throw new Error("Error en la consulta: " + error);
    } finally {
      closeDB();
    }
  }

  async createTask(data: any): Promise<any> {
    const pool = await connectDB();

    console.log("Datos recibidos repositorio", data);

    const {
      userDni,
      clientDni,
      tittleTask,
      fechaRegistro,
      startTime,
      endTime,
      ou_proyecto,
      ou_seccion,
      ou_descripcion,
    } = data;

    try {
      const result = await pool
        .request()
        .input("ou_user_ci", sql.VarChar, userDni)
        .input("ou_ci_ruc", sql.VarChar, clientDni)
        .input("ou_titulo", sql.VarChar, tittleTask)
        .input("ou_fecha_registro", sql.VarChar, fechaRegistro)
        .input("ou_tiempo_inicio", sql.VarChar, startTime)
        .input("ou_tiempo_final", sql.VarChar, endTime)
        .input("ou_proyecto", sql.VarChar, ou_proyecto)
        .input("ou_seccion", sql.VarChar, ou_seccion)
        .input("ou_descripcion", sql.VarChar, ou_descripcion)
        .input("ou_accion", sql.VarChar, "CREAR")
        .output("ou_databaseResponse", sql.VarChar(MAX))
        .execute("SP_CREARACTUALIZAR_ACTIVIDADES");
      console.log(result.recordset);
      return result.recordset;
    } catch (error) {
      throw error;
    } finally {
      closeDB();
    }
  }
}
