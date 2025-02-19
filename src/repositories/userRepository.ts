import { connectDB } from "../config/database/dbConnection";
import sql, { MAX, RequestError } from "mssql";
import type { User, UserLogin, UserRegister } from "../models/users/userModel";
import { authLoginSchema, authSchema } from "../schemas/authSchema";
import { safeParse } from "valibot";
import { hash } from "bcrypt";

export class authRepository {
  /**
   * Método para registrar un usuario en la base de datos.
   * @param {object} userData Datos del usuario a registrar.
   * @returns {boolean} Devuelve true si el usuario se registró correctamente.
   */
  async registerUser(userData: UserRegister): Promise<string> {
    const userDataValidated = safeParse(authSchema, userData);

    if (!userDataValidated.success) {
      // console.log(userDataValidated.issues[0].message);
      throw new Error(userDataValidated.issues[0].message);
    }
    try {
      const passwordHash = await hash(userData.password, 10);

      const pool = await connectDB();
      const result = await pool
        .request()
        .input("ou_cedula", sql.VarChar, userData.dni)
        .input("ou_nombreUsuario", sql.VarChar, userData.name)
        .input("ou_apellidoUsuario", sql.VarChar, userData.lastName)
        .input("ou_estado", sql.Bit, 0)
        .input("ou_nicknameUsuario", sql.VarChar, userData.nickname)
        .input("ou_correoUsuario", sql.VarChar, userData.email)
        .input("ou_contraseña", sql.VarChar, passwordHash)
        .input("ou_departamento", sql.Int, userData.department)
        .input("ou_tipoProceso", sql.VarChar, "REGISTRAR")
        .output("ou_salida", sql.VarChar(250))
        .execute("SP_CREARACTUALIZAR_USUARIO");

      const salida_mensaje = result.output.ou_salida;

      console.log("salida", salida_mensaje);

      return salida_mensaje || "";
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        console.error("Error desconocido:", error);
        throw new Error("Ha ocurrido un error desconocido.");
      }
    }
  }

  /**
   *
   * @param {object} userData Datos del usuario a iniciar sesión.
   * @returns {object} devuelve array con informacion del usuario
   */
  async LoginUser(userData: UserLogin) {
    const userDataValidated = safeParse(authLoginSchema, userData);
    if (!userDataValidated.success) {
      throw new Error("Formato de datos incorrecto");
    }

    try {
      let salida = "";
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("ou_email", sql.VarChar, userData.email)
        .input("ou_tipoproceso", sql.VarChar, "INICIAR_SESION")
        .output("ou_salida", sql.VarChar, salida)
        .execute("SP_LOGIN_USUARIO");
      const user = result.recordset[0]; // Obtener el primer resultado de la consulta

      return user || null;
    } catch (error) {
      throw new Error("Error al iniciar sesion, verifique los datos" + error);
    }
  }

  async InfoUser(mail: String) {
    try {
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("ou_mail", sql.VarChar, mail)
        .output("ou_salida", sql.VarChar(MAX))
        .execute("SP_INFO_USUARIO");
      const user = JSON.parse(result.recordset[0].Response);
      return user || null;
    } catch (error: unknown) {
      console.error("Error details:", error); // Log full error message
      throw new Error("Error in func InfoUser: " + error);
    }
  }

  async getActiveUsers(): Promise<User[]> {
    try {
      const pool = await connectDB();
      console.log("Conexión a la base de datos establecida.");

      // Crear una variable para almacenar la respuesta
      let outputResponse = "";

      const result = await pool
        .request()
        .output("ou_databaseResponse", sql.VarChar(MAX), outputResponse) // Agregar el parámetro de salida
        .execute("SP_OBTENER_USUARIOS_ACTIVOS");

      console.log("Resultado del procedimiento almacenado:", result);

      // Obtener la respuesta del parámetro de salida
      const response = result.output.ou_databaseResponse;

      if (!response) {
        throw new Error("El procedimiento no devolvió datos válidos.");
      }

      console.log("Respuesta del procedimiento:", response);

      // Parsear la respuesta JSON
      const users: User[] = JSON.parse(response); // Parsear directamente el JSON
      return users;
    } catch (error: unknown) {
      console.error("Error en getActiveUsers:", error);
      if (error instanceof RequestError) {
        throw new Error(error.message);
      } else {
        throw new Error("Ha ocurrido un error desconocido.");
      }
    }
  }
}
