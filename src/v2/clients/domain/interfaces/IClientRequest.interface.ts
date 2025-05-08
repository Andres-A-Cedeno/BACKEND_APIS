import { ClientModel } from "../entities/Client.entity";

export interface IClientRequest {
  createClient(client: ClientModel): Promise<{ message: string }>;
  updateClient(id: number, client: ClientModel): Promise<{ message: string }>;
  getClients(): Promise<ClientModel[]>;
  getClientById(id: number): Promise<ClientModel | null>;
  deleteClient(id: number): Promise<{ message: string }>;
}
