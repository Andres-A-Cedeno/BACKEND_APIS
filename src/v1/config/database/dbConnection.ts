import sql, { ConnectionPool } from "mssql";

const config = {
  user: process.env.DB_USER || "",
  password: process.env.DB_PASSWORD || "",
  server: process.env.DB_SERVER || "",
  database: process.env.DB_DATABASE || "",
  port: parseInt(process.env.DB_SERVER_PORT || "1433"),
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

let pool: ConnectionPool | null = null;

/**
 * Conecta a la base de datos SQL Server.
 * @returns {Promise<ConnectionPool>} Instancia de la conexión.
 */
export const connectDB = async (): Promise<ConnectionPool> => {
  if (!pool) {
    try {
      pool = await new sql.ConnectionPool(config).connect();
      console.log("✅ Conexión establecida a la base de datos");
    } catch (error) {
      console.error("❌ Error al conectar a la base de datos:", error);
      throw "Error al conectar a la base de datos" + error;
    }
  }
  return pool;
};

/**
 * Cierra la conexión con la base de datos.
 */
export const closeDB = async (): Promise<void> => {
  if (pool) {
    try {
      await pool.close();
      console.log("✅ Conexión cerrada exitosamente");
    } catch (error) {
      console.error("❌ No se pudo cerrar la conexión:", error);
      throw "No se pudo cerrar la conexión" + error;
    } finally {
      pool = null;
    }
  }
};
