import type { Request, Response } from "express";
import { userService } from "../services/userService";

export class userController {
  private userService: userService;

  constructor() {
    this.userService = new userService();
  }

  /**
   * Obtiene todos los usuarios activos.
   * @param {Request} req Objeto de solicitud.
   * @param {Response} res Objeto de respuesta.
   */
  async getAllUsers(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los usuarios", error });
    }
  }
}
