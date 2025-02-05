import type { Department } from "../models/departmentModel";
import { connectDB, closeDB } from "../config/database/dbConnection";
import sql from "mssql";

export class departmentRepository {
  async getAllDepartments(): Promise<Department[]> {
    const pool = await connectDB();
    try {
      const result = await pool
        .request()
        .query(`SELECT CPD_ID, CPD_NOMBRE FROM CP_DEPARTAMENTOS`);

      const department: Department[] = result.recordset.map(
        (department: { CPD_ID: number; CPD_NOMBRE: string }) => ({
          id: department.CPD_ID,
          nombre: department.CPD_NOMBRE,
        })
      );
      console.log(department);
      return department;
    } catch (error) {
      throw new Error("Error en la consulta: " + error);
    } finally {
      closeDB();
    }
  }
}
