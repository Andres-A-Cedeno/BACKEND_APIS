import type { Department } from "../models/departmentModel";
import { connectDB, closeDB } from "../config/database/dbConnection";
import sql from "mssql";

export class departmentRepository {
  private pool!: sql.ConnectionPool;

  constructor() {
    this.init();
  }

  private async init() {
    this.pool = await connectDB(); // Espera a que la conexión se establezca
  }

  async getAllDepartments(): Promise<Department[]> {
    try {
      const result = await this.pool.query(
        `SELECT CPD_ID, CPD_NOMBRE FROM CP_DEPARTAMENTOS`
      );

      const department: Department[] = result.recordset.map(
        (department: any) => ({
          id: department.CPD_ID,
          nombre: department.CPD_NOMBRE,
        })
      );

      console.log(department);

      return department;
    } catch (error) {
      throw new Error("Error en la consulta: " + error);
    } finally {
      closeDB;
    }
  }
}
