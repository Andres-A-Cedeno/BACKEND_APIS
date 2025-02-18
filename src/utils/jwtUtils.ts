import jwt, { type JwtPayload } from "jsonwebtoken";

const secret = process.env.JWT_SECRET;
const refreshSecret = process.env.REFRESH_TOKEN;

//Generamos el token

/**
 * Genera un Access Token y un Refresh Token
 * @param {string} email El email del usuario para generar los tokens
 * @param {string} dni El DNI del usuario para generar los tokens
 * @returns {object} Un objeto con el accessToken y refreshToken
 */
export const generateToken = (
  email: string,
  dni: string
): { accessToken: string; refreshToken: string } => {
  //Se valida que los secretos sean definidos
  if (!secret || !refreshSecret)
    throw new Error("Faltan secretos definir en .env");

  const Payload: JwtPayload = {
    email,
    dni,
  };

  //Se genera el token de acceso
  try {
    const accessToken = jwt.sign(Payload, secret, { expiresIn: "1h" });
    //Se genera el token de refresco
    const refreshToken = jwt.sign(Payload, refreshSecret, { expiresIn: "3h" });
    return { accessToken, refreshToken };
  } catch (error) {
    throw "No se puede generar el token" + error;
  }
};

export const getbyToken = (
  token: string
): { verified: string | JwtPayload } => {
  if (!secret || !refreshSecret) throw "Faltan secretos definir en .env";
  try {
    const verified = jwt.verify(token, secret);
    return { verified };
  } catch (error) {
    throw "Error en utils: " + error;
  }
};
