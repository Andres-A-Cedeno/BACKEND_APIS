import { ClientModel } from "../domain/entities/Client.entity";
import { IClientRequest } from "../domain/interfaces/IClientRequest.interface";

export class ClientUseCases {
  constructor(private IClientRequest: IClientRequest) {}

  async createClient(client: ClientModel) {
    return await this.IClientRequest.createClient(client);
  }

  async updateClient(id: number, client: ClientModel) {
    return await this.IClientRequest.updateClient(id, client);
  }

  async getClients() {
    return await this.IClientRequest.getClients();
  }

  async getClientById(id: number) {
    return await this.IClientRequest.getClientById(id);
  }

  async deleteClient(id: number) {
    return await this.IClientRequest.deleteClient(id);
  }
}
