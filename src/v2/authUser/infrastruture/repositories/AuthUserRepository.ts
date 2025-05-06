import {
  type IAuthUser,
  AuthUser,
  type IUserRegister,
} from "../../domain/index.js";
import { JwtService } from "../../../Security/Jwt/JwtService.js";
import sql, { RequestError } from "mssql";
import { compare, hash } from "bcrypt";
import { Connection } from "../../../server/database/Connection.js";
import { AuthEnumState, AuthParams } from "../../domain/enum/AuthEnum.js";
import { TypeProcess } from "../../../enums/typeProcess.js";
import { EmailService } from "../../../Security/Email/EmailService.js";
import { ENV } from "../../../server/config/dbConfig.js";

export class AuthUserRepositoty implements IAuthUser {
  private pool!: sql.ConnectionPool;

  constructor() {
    Connection.connect().then((pool) => {
      this.pool = pool;
    });
  }

  /**
   * Authenticates a user by validating their email and password.
   *
   * @param {string} email - The user's email address used for authentication
   * @param {string} password - The user's plain text password to be verified against stored hash
   * @returns {Promise<AuthUser>} A promise that resolves to an AuthUser object containing user information and authentication tokens
   * @throws {Error} Throws an error if password is incorrect or if there's an issue with the database connection
   *
   * @description This method performs the following steps:
   * 1. Queries the database to retrieve the user's encrypted password using their email
   * 2. Compares the provided password with the stored encrypted password
   * 3. If authentication is successful, retrieves the user's information from the database
   * 4. Generates JWT access and refresh tokens for the authenticated user
   * 5. Returns a new AuthUser instance with user details and tokens
   */
  async login(email: string, password: string): Promise<AuthUser> {
    try {
      // console.log("Email", email);
      // console.log("Password", password);
      const result = await this.pool
        .request()
        .input(AuthParams.email, sql.VarChar, email)
        // .input("ou_password", sql.VarChar, password)
        .input(AuthParams.typeProcess, sql.VarChar, TypeProcess.LOGIN)
        .output(AuthParams.outputParam, sql.VarChar)
        .execute("SP_LOGIN_USUARIO");

      const encryptPassword = await result.output.ou_salida;

      console.log("Encrypt password", encryptPassword);

      const hashPassword = await compare(password, encryptPassword);
      if (!hashPassword) {
        throw new Error("Contraseña incorrecta");
      }

      //Obtener los datos de la consulta
      const user = await result.recordset[0];

      // console.log("User data get it Repository", user);

      const Token = JwtService.generateToken({
        email: user.email,
        dni: user.dni,
      });

      const refreshToken = JwtService.generateRefreshToken({
        email: user.email,
        dni: user.dni,
      });

      return new AuthUser({
        dni: user.dni,
        nickname: user.nickname,
        name: user.name,
        lastName: user.lastName,
        email: user.email || "",
        status: user.status ? AuthEnumState.ACTIVE : AuthEnumState.INACTIVE,
        departament: user.departamentName,
        role: user.role ?? 0,
        token: Token,
        refreshToken: refreshToken,
      });
    } catch (error) {
      //console.error("❌ ERROR: Error al iniciar sesión", error);
      if (error instanceof RequestError) {
        throw new Error(error.message);
      }
      throw new Error("Error al iniciar sesión");
    }
  }

  /**
   * Registers a new user in the system.
   *
   * @param {IUserRegister} user - The user registration data containing personal information and credentials
   * @returns {Promise<{ message: string }>} A promise that resolves to an object containing a success message from the database
   * @throws {Error} Throws an error if there's an issue with the registration process or database connection
   *
   * @description This method performs the following steps:
   * 1. Hashes the user's password using bcrypt for secure storage
   * 2. Sends the user data along with the hashed password to the database via a stored procedure
   * 3. Returns a message from the database indicating the result of the registration process
   * 4. In case of errors, throws an appropriate error message
   */
  async register(user: IUserRegister): Promise<{ message: string }> {
    // console.log("User data get it Repository", user);
    try {
      //Hash the password
      const hashPassword = await hash(user.password!, 10);
      //console.log("Hashed password", hashPassword);

      const result = await this.pool
        .request()
        .input("ou_cedula", sql.VarChar, user.dni)
        .input("ou_nombreUsuario", sql.VarChar, user.name)
        .input("ou_apellidoUsuario", sql.VarChar, user.lastName)
        .input("ou_estado", sql.Bit, AuthEnumState.INACTIVE)
        .input("ou_nicknameUsuario", sql.VarChar, user.nickname)
        .input("ou_correoUsuario", sql.VarChar, user.email)
        .input("ou_contraseña", sql.VarChar, hashPassword)
        .input("ou_departamento", sql.Int, user.departament)
        .input("ou_tipoProceso", sql.VarChar, TypeProcess.INSERT)
        .output("ou_salida", sql.VarChar)
        .execute("SP_CREARACTUALIZAR_USUARIO");

      //console.log("MessageDB", result);
      const messageDb = await result.output.ou_salida;

      return { message: messageDb };
    } catch (error) {
      console.error("❌ ERROR: Error al registrar el usuario", error);
      if (error instanceof RequestError) {
        throw new Error(error.message);
      }
      throw new Error("Error al registrar el usuario");
    }
  }

  async logout(email: string): Promise<{ message: string }> {
    try {
      return { message: "Session cerrada correctamente" };
    } catch (error) {
      throw new Error("Error al cerrar la sesión");
    }
  }

  /**
   * Solicita un restablecimiento de contraseña para el usuario
   * @param email Correo electrónico del usuario
   * @returns Mensaje de confirmación
   */
  async requestPasswordReset(email: string): Promise<{ message: string }> {
    try {
      // Verificar que el usuario existe
      const userExists = await this.pool
        .request()
        .input("email", sql.VarChar, email)
        .query("SELECT * FROM CP_USUARIOS WHERE CPU_CORREO = @email");

      //✅
      //console.log("User found *-*-*-",userExists.recordset[0])
      // .input(AuthParams.email, sql.VarChar, email)
      // .input(AuthParams.typeProcess, sql.VarChar, TypeProcess.LOGIN)
      // .output(AuthParams.outputParam, sql.VarChar)
      // .execute("SP_LOGIN_USUARIO");

      //console.log("UserExists", userExists.recordset);
      //✅
      if (!userExists.recordset[0] || userExists.recordset.length === 0) {
        throw new Error("No existe un usuario con ese correo electrónico");
      }

      // Generar token de restablecimiento (expira en 1 hora)
      const resetToken = JwtService.generateToken({
        email,
        purpose: "password-reset",
      });

      //✅
      //console.log("ResetToken", resetToken);

      // Construir el enlace de restablecimiento
      const resetLink = `${
        ENV.FRONTEND_URL || "http://localhost:3000"
      }/reset-password/${resetToken}`;

      //console.log("ResetLink", resetLink);

      // Enviar correo electrónico
      const emailSent = await EmailService.sendPasswordResetEmail(
        email,
        resetLink
      );

      //console.log("EmailSent", emailSent);

      if (!emailSent) {
        throw new Error("Error al enviar el correo electrónico");
      }

      return {
        message:
          "Se ha enviado un enlace de recuperación a tu correo electrónico",
      };
    } catch (error) {
      console.error(
        "❌ ERROR: Error al solicitar restablecimiento de contraseña",
        error
      );
      if (error instanceof RequestError) {
        throw new Error(error.message);
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error al solicitar restablecimiento de contraseña");
    }
  }

  /**
   * Verifica si el token de restablecimiento es válido
   * @param token Token de restablecimiento
   * @returns Información del usuario asociado al token
   */
  async verifyResetToken(token: string): Promise<{ email: string }> {
    try {
      // Verificar y decodificar el token
      const decoded = JwtService.verifyToken(token);

      if (!decoded || typeof decoded === "string") {
        throw new Error("Token inválido o expirado");
      }

      // Verificar que el token es para restablecimiento de contraseña
      if (decoded.purpose !== "password-reset") {
        throw new Error("Token inválido para restablecimiento de contraseña");
      }

      // Verificar que el usuario existe
      const email = decoded.email as string;
      const userExists = await this.pool
        .request()
        .input(AuthParams.email, sql.VarChar, email)
        .input(AuthParams.typeProcess, sql.VarChar, TypeProcess.LOGIN)
        .output(AuthParams.outputParam, sql.VarChar)
        .execute("SP_LOGIN_USUARIO");

      if (!userExists.recordset || userExists.recordset.length === 0) {
        throw new Error("No existe un usuario con ese correo electrónico");
      }

      return { email };
    } catch (error) {
      console.error(
        "❌ ERROR: Error al verificar token de restablecimiento",
        error
      );
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Token inválido o expirado");
    }
  }

  /**
   * Actualiza la contraseña del usuario después de la verificación del token
   * @param email Correo electrónico del usuario
   * @param newPassword Nueva contraseña del usuario
   * @returns Mensaje de confirmación
   */
  async resetPassword(
    email: string,
    newPassword: string
  ): Promise<{ message: string }> {
    try {
      // Verificar que el usuario existe
      const userExists = await this.pool
        .request()
        .input(AuthParams.email, sql.VarChar, email)
        .input(AuthParams.typeProcess, sql.VarChar, TypeProcess.LOGIN)
        .output(AuthParams.outputParam, sql.VarChar)
        .execute("SP_LOGIN_USUARIO");

      if (!userExists.recordset || userExists.recordset.length === 0) {
        throw new Error("No existe un usuario con ese correo electrónico");
      }

      // Obtener los datos del usuario
      const user = userExists.recordset[0];

      // Encriptar la nueva contraseña
      const hashedPassword = await hash(newPassword, 10);

      // Actualizar la contraseña en la base de datos
      const result = await this.pool
        .request()
        .input("ou_cedula", sql.VarChar, user.dni)
        .input("ou_nombreUsuario", sql.VarChar, user.name)
        .input("ou_apellidoUsuario", sql.VarChar, user.lastName)
        .input(
          "ou_estado",
          sql.Bit,
          user.status ? AuthEnumState.ACTIVE : AuthEnumState.INACTIVE
        )
        .input("ou_nicknameUsuario", sql.VarChar, user.nickname)
        .input("ou_correoUsuario", sql.VarChar, email)
        .input("ou_contraseña", sql.VarChar, hashedPassword)
        .input("ou_departamento", sql.Int, user.departament)
        .input("ou_tipoProceso", sql.VarChar, TypeProcess.UPDATE)
        .output("ou_salida", sql.VarChar)
        .execute("SP_CREARACTUALIZAR_USUARIO");

      const messageDb = await result.output.ou_salida;

      // Enviar correo de confirmación
      await EmailService.sendPasswordChangedConfirmation(email);

      return { message: "Contraseña actualizada correctamente" };
    } catch (error) {
      console.error("❌ ERROR: Error al restablecer contraseña", error);
      if (error instanceof RequestError) {
        throw new Error(error.message);
      }
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Error al restablecer contraseña");
    }
  }
}
