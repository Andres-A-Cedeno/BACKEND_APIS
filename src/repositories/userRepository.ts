import { connectDB, closeDB } from "../config/database/dbConnection";
import sql from "mssql";
import type { UserLogin, UserRegister } from "../models/users/userModel";
import { authLoginSchema } from "../schemas/authSchema";
import { safeParse } from "valibot";

export class UserRepository {
  /**
   * Método para registrar un usuario en la base de datos.
   * @param {object} userData Datos del usuario a registrar.
   * @returns {boolean} Devuelve true si el usuario se registró correctamente.
   */
  //   async registerUser(userData: UserRegister): Promise<string> {
  //     const pool = await connectDB();

  //     try {
  //       const result = await pool
  //         .request()
  //         .input("dni", sql.VarChar, userData.dni);

  //       if (result.recordset.length > 0) {
  //         throw new Error("El DNI ya está registrado.");
  //       }
  //     } catch (error) {
  //       throw new Error("Error al registrar el usuario.");
  //     }
  //   }

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
      const pool = await connectDB();
      const result = await pool
        .request()
        .input("email", sql.VarChar, userData.email)
        .query(
          "SELECT CPU_CONTRASENA FROM CP_USUARIOS WHERE CPU_CORREO = @email"
        );
      const user = result.recordset[0]; // Obtener el primer resultado de la consulta

      console.log("👍 Usuario Obtenido correctamente");
      return user.CPU_CONTRASENA || null;
    } catch (error) {
      throw new Error("Error al validar el usuario (Repository)" + error);
    } finally {
      closeDB();
    }
  }
}
