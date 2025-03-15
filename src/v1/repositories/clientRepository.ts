import type { Client } from "../models/clientModel";
import { connectDB, closeDB } from "../config/database/dbConnection";
import sql from "mssql";

export class clientRepository {
  async getAllClients(): Promise<Client[]> {
    const pool = await connectDB();
    try {
      const result = await pool
        .request()
        .query(`SELECT CPC_CI_RUC, CPC_NOMBRE_CLIENTE FROM CP_CLIENTES`);

      console.log(result.recordset);

      const client: Client[] = result.recordset.map(
        (client: { CPC_CI_RUC: number; CPC_NOMBRE_CLIENTE: string }) => ({
          ci_ruc: client.CPC_CI_RUC,
          nombre: client.CPC_NOMBRE_CLIENTE,
        })
      );
      console.log(client);
      return client;
    } catch (error) {
      throw new Error("Error en la consulta: " + error);
    }
  }
}
