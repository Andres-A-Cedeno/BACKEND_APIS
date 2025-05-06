import jwt, { type JwtPayload } from "jsonwebtoken";
import { ENV } from "../../server/config/dbConfig.js";

export class JwtService {
  private static readonly ACCESS_SECRET: string = ENV.jwtSecret!;
  private static readonly REFRESH_SECRET = ENV.jwtRefreshSecret;
  private static readonly ACCESS_EXPIRATION: string = ENV.jwtAccessExpiration!;
  private static readonly REFRESH_EXPIRATION = ENV.jwtRefreshExpiration;

  /**
   * Genera un Access Token para el usuario
   */
  static generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, JwtService.ACCESS_SECRET!, {
      expiresIn: JwtService.ACCESS_EXPIRATION,
    });
  }

  /**
   * Genera un Refresh Token para el usuario
   */
  static generateRefreshToken(payload: object): string {
    return jwt.sign(payload, JwtService.REFRESH_SECRET!, {
      expiresIn: JwtService.REFRESH_EXPIRATION,
    });
  }

  /**
   * Verifica y decodifica un Access Token
   */
  static verifyToken(
    token: string
  ): string | JwtPayload | { dni: string; email: string } {
    try {
      return jwt.verify(token, JwtService.ACCESS_SECRET);
    } catch (error) {
      console.error("❌ Error verificando token:", error);
      throw new Error("Token Invalido o expirado");
    }
  }

  /**
   * Verifica y decodifica un Refresh Token
   */
  static verifyRefreshToken(token: string): string | JwtPayload | null {
    try {
      return jwt.verify(token, JwtService.REFRESH_SECRET);
    } catch (error) {
      console.error("❌ Error verificando refresh token:", error);
      throw new Error("Refresh Token Invalido o expirado");
    }
  }

  static refreshAccessToken(refreshToken: string): {
    accessToken: string;
    refreshToken: string;
  } {
    try {
      const decoded = this.verifyRefreshToken(refreshToken);

      const newAccessToken = this.generateToken({
        email: decoded.email,
        dni: decoded.dni,
      });

      const newRefreshToken = this.generateRefreshToken({
        email: decoded.email,
        dni: decoded.dni,
      });

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      console.error("❌ Error al refrescar el Access Token:", error);
      throw new Error("No se pudo generar el access token");
    }
  }
}
