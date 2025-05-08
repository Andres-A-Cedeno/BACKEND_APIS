import sql from "mssql";
import { Connection } from "../../../server/database/Connection";
import { ClientModel } from "../../domain/entities/Client.entity";
import { IClientRequest } from "../../domain/interfaces/IClientRequest.interface";
import { TypeProcess } from "../../../enums/typeProcess";

export class ClientRepository implements IClientRequest {
  /***
   * Variable to get connection pool
   */
  private pool!: sql.ConnectionPool;

  constructor() {
    Connection.connect().then((pool) => {
      this.pool = pool;
    });
  }

  /**
   *
   * @param client
   */
  async createClient(client: ClientModel): Promise<{ message: string }> {
    try {
      console.log("Datos recibidos repository", client as ClientModel);
      const request = await this.pool
        .request()
        .input("ou_nombreCliente", sql.VarChar, client.userCustomerName)
        .input("ou_cedulaUsuario", sql.VarChar, client.userCustomerDni)
        .input("ou_RUC", sql.VarChar, client.customerRUC)
        .input("ou_tipo", sql.VarChar, client.customerType)
        .input("ou_tipoProceso", sql.VarChar, TypeProcess.CREATE)
        .input("ou_sector", sql.VarChar, client.customerSector)
        .input("ou_dirEnvio", sql.VarChar, client.customerShippingAddress)
        .input("ou_cdadEnvio", sql.VarChar, client.customerShippingCity)
        .input("ou_paisEnvio", sql.VarChar, client.customerShippingCountry)
        .input("ou_dirFactu", sql.VarChar, client.customerBillingAddress)
        .input("ou_cdadFactu", sql.VarChar, client.customerBillingCity)
        .input("ou_paisFactu", sql.VarChar, client.customerBillingCountry)
        .execute("CREAR_ACTUALIZAR_CLIENTES");

      return { message: "Cliente creado correctamente" };
    } catch (error) {
      console.error(error);
      throw new Error("Ocurrio un error al crear el cliente");
    }
  }

  updateClient(id: number, client: ClientModel): Promise<{ message: string }> {
    throw new Error("Method not implemented.");
  }

  async getClients(): Promise<ClientModel[]> {
    try {
      const request = await this.pool.request().execute("SP_BUSCAR_CLIENTES");
      const jsonKey = Object.keys(request.recordset[0])[0];
      const clientsData = JSON.parse(request.recordset[0][jsonKey]);
      return clientsData;
    } catch (error) {
      throw new Error("No se pudo obtener los clientes");
    }
  }

  getClientById(id: number): Promise<ClientModel | null> {
    try {
      throw new Error("Method not implemented.");
    } catch (error) {
      throw new Error("No se pudo obtener el cliente");
    }
  }
  deleteClient(id: number): Promise<{ message: string }> {
    throw new Error("Method not implemented.");
  }
}
