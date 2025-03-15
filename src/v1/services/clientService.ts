import type { Client } from "../models/clientModel";
import { clientRepository } from "../repositories/clientRepository";

export class clientService {
  private clientRepo: clientRepository;

  constructor() {
    this.clientRepo = new clientRepository();
  }
  getAllClients = async (): Promise<Client[]> => {
    try {
      const result = await this.clientRepo.getAllClients();
      return result;
    } catch (error) {
      throw new Error("Error en la consulta: " + error);
    }
  };
}
