import { connectDB, closeDB } from "../../config/database/dbConnection"; // Importa la conexión a la base de datos
import type { UserLogin, UserRegister } from "../../schemas/authSchema"; // El tipo de usuario
import sql from "mssql";
import { generateToken } from "../../utils/jwtUtils";
import bcrypt from "bcrypt"; // Para encriptar la contraseña

/**
 * Registra un nuevo usuario en la base de datos.
 * @param {UserRegister} userData Los datos del usuario que se van a registrar.
 * @returns {Promise<any>} El usuario registrado.
 */
export const registerUser = async (userData: UserRegister): Promise<any> => {
  const pool = await connectDB(); // Obtén la conexión al pool

  // Encriptar la contraseña
  const hashedPassword = await bcrypt.hash(userData.password, 10); // Encriptamos la contraseña

  try {
    // Insertar el nuevo usuario en la base de datos
    const result = await pool
      .request()
      .input("dni", sql.VarChar, userData.dni)
      .input("name", sql.VarChar, userData.name)
      .input("lastName", sql.VarChar, userData.lastName)
      .input("email", sql.VarChar, userData.email)
      .input("password", sql.VarChar, hashedPassword) // Usar la contraseña encriptada
      .input("nickname", sql.VarChar, userData.nickname)
      .input("department", sql.Int, userData.department)
      .input("status", sql.VarChar, userData.status)
      .input("role", sql.Int, userData.role || 1) // Role por defecto es 1 si no se proporciona
      .query(`
        INSERT INTO Users (dni, name, lastName, email, password, nickname, department, status, role)
        VALUES (@dni, @name, @lastName, @email, @password, @nickname, @department, @status, @role)
      `);
    closeDB();
    return { message: "Usuario registrado con éxito" };
  } catch (error) {
    console.error("❌ Error al registrar el usuario:", error);
    //throw new Error(`No se pudo registrar el usuario: ${error.message}`);
  }
};

/**
 * Valida el login de un usuario.
 * @param {UserLogin} userData El objeto que contiene el email y la contraseña del usuario.
 * @returns {Promise<any>} Los tokens generados si las credenciales son válidas.
 */
export const loginUser = async (userData: UserLogin): Promise<any> => {
  const pool = await connectDB(); // Obtén la conexión al pool de la base de datos

  try {
    // Buscar el usuario en la base de datos usando el email del userData
    const result = await pool
      .request()
      .input("email", sql.VarChar, userData.email)
      .query("SELECT * FROM Users WHERE email = @email");

    const user = result.recordset[0]; // Obtener el primer resultado de la consulta

    // Verificar si el usuario existe
    if (!user) {
      throw new Error("El usuario no existe.");
    }

    // Comparar la contraseña proporcionada con la contraseña almacenada
    const passwordMatch = await bcrypt.compare(
      userData.password,
      user.password
    );
    if (!passwordMatch) {
      throw new Error("Contraseña incorrecta.");
    }

    // Generar los tokens (Access Token y Refresh Token)
    const { accessToken, refreshToken } = generateToken(user.email, user.dni);

    closeDB();
    // Retornar los tokens generados
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("❌ Error en el login:", error);
    //throw new Error(`Error al realizar el login: ${error.message}`);
  }
};
