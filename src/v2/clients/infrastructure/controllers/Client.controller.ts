import type { Request, Response } from "express";
import { ClientUseCases } from "../../application/Client.use-cases";
import { ClientDTO } from "../../domain/interfaces/ClientRequest";

export class ClientController {
  constructor(private clientUseCases: ClientUseCases) {}

  async createClient(req: Request, res: Response) {
    try {
      const client = new ClientDTO(req.body).toClientModel();
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
      // Nota --> Considerar que se debe enviar el usuario y el idioma por el header
      const clients = await this.clientUseCases.getClients();
      res.status(200).json(clients);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "No se pudo obtener los clientes" });
    }
  }
}
