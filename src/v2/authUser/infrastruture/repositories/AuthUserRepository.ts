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

      const hashPassword = compare(password, encryptPassword);
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
      console.error("❌ ERROR: Error al iniciar sesión", error);
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
}
