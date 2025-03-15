import jwt, { type JwtPayload } from "jsonwebtoken";

export class JwtService {
  private static readonly ACCESS_SECRET: string = process.env.JWT_SECRET!;
  private static readonly REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
  private static readonly ACCESS_EXPIRATION: string =
    process.env.ACCESS_EXPIRATION!;
  private static readonly REFRESH_EXPIRATION = process.env.REFRESH_EXPIRATION;

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
