import type { Request, Response } from "express";
import { clientService } from "../services/clientService";

export class clientController {
  private clientService: clientService;

  constructor() {
    this.clientService = new clientService();
  }

  getClientsList = async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await this.clientService.getAllClients();
      return res
        .status(200)
        .json({ message: "Clientes obtenidos con exito", data: result });
    } catch (error) {
      console.error("Error en el registro:", error);
      if (error instanceof Error) {
        // console.error("Error en el registro:", error.message);
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: error });
    }
  };
}
