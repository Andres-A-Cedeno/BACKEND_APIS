import type { Request, Response } from "express";
import { ClientUseCases } from "../../application/client.use-cases";
import { ClientModel } from "../../domain/entities/Client.entity";

export class ClientController {
  constructor(private clientUseCases: ClientUseCases) {}

  async createClient(req: Request, res: Response) {
    try {
      const client = req.body as ClientModel;
      const clientCreated = await this.clientUseCases.createClient(client);
      res.status(201).json(clientCreated);
    } catch (error) {
      res.status(500).json({ message: "No se pudo crear el cliente" });
    }
  }

  /**
   * Usuario nuevo a crear
   * @param req
   * @param res
   */
  async getClients(req: Request, res: Response) {
    try {
      const clients = await this.clientUseCases.getClients();
      res.status(200).json(clients);
    } catch (error) {
      throw new Error("No se pudo obtener los clientes controlador");
    }
  }
}
