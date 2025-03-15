import type { IDepartments } from "../../domain/interfaces/IDepartments";
import { Department } from "../../domain/entities/Department.js";
import { Connection } from "../../../server/database/Connection";
import sql from "mssql";
export class DepartmentRepository implements IDepartments {
  //Variables

  private pool!: sql.ConnectionPool;

  private message: string;
  constructor() {
    Connection.connect().then((pool) => {
      this.pool = pool;
    });
    this.message = "";
  }

  /**
   * Function to get all departments
   * @returns {Promise<Department[]>}
   */
  async getDepartments(): Promise<Department[]> {
    let salida;
    try {
      const result = await this.pool
        .request()
        .output("ou_mensajeSalida", sql.VarChar, salida)
        .execute("SP_GET_DEPARTMENTS");

      //   this.message = "Consulta exitosa";
      const departments: Department[] = result.recordset.map(
        (department: { CPD_ID: number; CPD_NOMBRE: string }) =>
          new Department(department.CPD_ID, department.CPD_NOMBRE)
      );

      return departments;
    } catch (error) {
      console.error("❌ ERROR: Error al obtener los departamentos", error);
      throw new Error("Error en la consulta" + error);
    }
  }
}
