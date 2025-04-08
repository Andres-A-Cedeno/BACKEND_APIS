import { config } from "../config/dbConfig.js";
import sql from "mssql";

export class Connection {
  private static pool: sql.ConnectionPool | null = null;

  constructor() {}

  public static async connect(): Promise<sql.ConnectionPool> {
    //console.log(this.pool);
    try {
      if (!Connection.pool) {
        Connection.pool = new sql.ConnectionPool(config);
        await Connection.pool.connect();
        console.log("✅ Conexión establecida a la base de datos");
      }
      return Connection.pool;
    } catch (error) {
      console.error("❌ Error al conectar a la base de datos:", error);
      throw "Error al conectar a la base de datos" + error;
    }
  }

  public static async closeConnection(): Promise<void> {
    console.log("❌ Conexión cerrada a la base de datos");
    if (Connection.pool) {
      await Connection.pool.close();
      Connection.pool = null;
      console.log("❌ Conexión cerrada a la base de datos");
    }
  }
}
