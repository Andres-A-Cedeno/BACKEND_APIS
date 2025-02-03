import { connectDB, closeDB } from "../config/database/dbConnection";
import sql from "mssql";
import type { UserLogin, UserRegister } from "../models/users/userModel";
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
      console.log(userDataValidated.issues[0].message);
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
    } finally {
      closeDB();
    }
  }

  /**
   *
   * @param {object} userData Datos del usuario a iniciar sesión.
   * @returns {string} devuelve la contrasena del usuario
   */
  async LoginUser(userData: UserLogin): Promise<string> {
    //validamos el formato de los datos
    const userDataValidated = safeParse(authLoginSchema, userData);
    if (!userDataValidated.success) {
      throw new Error(
        "Formato de datos incorrecto" + JSON.stringify(userDataValidated.issues)
      );
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
      console.log("👍 Usuario Obtenido correctamente");
      return user.CPU_CONTRASENA || null;
    } catch (error) {
      throw new Error("Error al iniciar sesion, verifique los datos" + error);
    } finally {
      closeDB();
    }
  }
}
