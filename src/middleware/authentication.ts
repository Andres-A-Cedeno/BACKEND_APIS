//import type { IncomingMessage, ServerResponse } from "http";
import type { JwtPayload } from "jsonwebtoken";
import { verify } from "jsonwebtoken";
import type { Response, Request, NextFunction } from "express";

export interface AuthenticationRequest extends Request {
  user?: JwtPayload | string;
}

/**
 *
 * @param req
 * @param res
 */

export const authenticateToken = async (
  req: AuthenticationRequest,
  res: Response,
  next: NextFunction
): Promise<boolean> => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];

  if (!token) {
    res.statusCode = 401;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({ message: "Inicie sesión para acceder al recurso." })
    );
    return false;
  }

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    next();
    return true;
  } catch (error) {
    res.statusCode = 403;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Su sesión ha caducado" }));
    return false;
  }
};
