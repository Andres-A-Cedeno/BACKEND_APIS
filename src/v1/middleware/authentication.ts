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
): Promise<void> => {
  const token = req.headers["authorization"];
  //console.log(req.headers);

  //const token = authHeader?.split(" ")[1];

  console.log("ELTOKEN ES: ", token);

  if (!token) {
    res.status(401).json({ message: "Inicie sesión para acceder al recurso." });
  }

  try {
    const decoded = verify(token!, process.env.JWT_SECRET!) as JwtPayload;
    req.user = decoded;
    console.log("error after", req.user);
    next();
  } catch (error) {
    res.status(403).json({ message: "Su sesión ha caducado" });
  }
};
