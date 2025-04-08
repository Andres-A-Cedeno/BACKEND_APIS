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
    const ACCESS_EXPIRATION = JwtService.ACCESS_EXPIRATION!;
    return jwt.sign(payload, JwtService.ACCESS_SECRET!, {
      expiresIn: "1h",
    });
  }

  /**
   * Genera un Refresh Token para el usuario
   */
  static generateRefreshToken(payload: object): string {
    return jwt.sign(payload, JwtService.REFRESH_SECRET!, {
      expiresIn: "7d",
    });
  }

  /**
   * Verifica y decodifica un Access Token
   */
  static verifyToken(token: string): string | JwtPayload | null {
    try {
      return jwt.verify(token, JwtService.ACCESS_SECRET!);
    } catch (error) {
      console.error("❌ Error verificando token:", error);
      return null;
    }
  }

  /**
   * Verifica y decodifica un Refresh Token
   */
  static verifyRefreshToken(token: string): string | JwtPayload | null {
    try {
      return jwt.verify(token, JwtService.REFRESH_SECRET!);
    } catch (error) {
      console.error("❌ Error verificando refresh token:", error);
      return null;
    }
  }
}
