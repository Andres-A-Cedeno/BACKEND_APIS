import { ClientModel } from "../entities/Client.entity";
import { IClientModel } from "./client.interface";

interface ClientRequest {
  nombreCliente: string;
  cedulaUsuario: string;
  RUC: number;
  tipo: string;
  sector: string;
  dirEnvio: string;
  cdadEnvio: string;
  dirFactu: string;
  paisEnvio: string;
  cdadFactu: string;
  paisFactu: string;
}

export class ClientDTO {
  constructor(public data: ClientRequest) {}

  // Mapeo directo del DTO al modelo, sin necesidad de métodos adicionales
  toClientModel(): ClientModel {
    const clientModel: IClientModel = {
      customers: {
        customer: {
          name: this.data.nombreCliente,
          type: this.data.tipo,
          RUC: this.data.RUC,
          billing: {
            address: this.data.dirFactu,
            city: this.data.cdadFactu,
            country: this.data.paisFactu,
          },
          shipping: {
            address: this.data.dirEnvio,
            city: this.data.cdadEnvio,
            country: this.data.paisEnvio,
          },
          sector: this.data.sector,
        },
        owner: {
          name: this.data.nombreCliente,
          dni: this.data.cedulaUsuario,
        },
      },
    };

    return new ClientModel(clientModel);
  }
}
