export interface ClientRequest {
  id: number;
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  country: string;
  createdAt?: Date;
  updatedAt?: Date;
}


class ClientDTO {
    constructor(public data: any) {}
  
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
          user: {
            name: this.data.nombreCliente,
            dni: this.data.cedulaUsuario,
          },
        },
      };
  
      return new ClientModel(clientModel);
    }
  }

{
    "nombreCliente": "Juan Pérez",
    "cedulaUsuario": "123",
    "RUC": 1234567890,
    "tipo": "Consumidor Final",
    "sector": "Tecnología",
    "dirEnvio": "Calle Falsa 123, Edificio A, Piso 4",
    "cdadEnvio": "Lima",
    "dirFactu": "Avenida Siempre Viva 456",
    "paisEnvio": "Perú",
    "cdadFactu": "Arequipa",
    "paisFactu": "Perú"
  }
  