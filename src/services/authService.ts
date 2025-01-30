import bcrypt from "bcrypt";
import { connectDB } from "../config/database/dbConnection";
import { generateToken } from "../utils/jwtUtils";
import type { UserLogin } from "../schemas/authSchema";
import sql from "mssql";

/**
 * Función para realizar el login de un usuario.
 * @param userData Datos del usuario (email y contraseña).
 * @returns Los tokens de acceso (accessToken y refreshToken) si las credenciales son correctas.
 */
export const loginUser = async (
  userData: UserLogin
): Promise<{ accessToken: string; refreshToken: string }> => {
  const { email, password } = userData;

  const pool = await connectDB(); // Obtén la conexión al pool de la base de datos

  try {
    // Buscar el usuario en la base de datos
    const result = await pool
      .request()
      .input("email", sql.VarChar, email)
      .query(
        "SELECT CPU_CONTRASENA FROM CP_USUARIOS WHERE CPU_CORREO = @email"
      );

    const user = result.recordset[0]; // Obtener el primer resultado de la consulta

    if (!user) {
      throw new Error("El usuario no existe.");
    }

    // Verificar si la contraseña está definida
    if (!user.password) {
      throw new Error("Contraseña no encontrada.");
    }

    // Verificar si el usuario existe
    if (!user) {
      throw new Error("El usuario no existe.");
    }

    // Comparar la contraseña proporcionada con la contraseña almacenada
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new Error("Contraseña incorrecta.");
    }

    // Generar los tokens (Access Token y Refresh Token)
    const { accessToken, refreshToken } = generateToken(user.email, user.dni);

    // Retornar los tokens generados
    return { accessToken, refreshToken };
  } catch (error) {
    console.error("❌ Error en el login:", error);
    // Retornar null o un valor por defecto si hay un error
    return { accessToken: "", refreshToken: "" }; // O podrías lanzar el error de nuevo si lo prefieres
  }
};
