import { Connection } from "../../../server/database/Connection";
import { MenuModel } from "../../domain/entities/MenuEntity";
import { IMenu } from "../../domain/interfaces/IMenu";
import sql from "mssql";

export class MenuRepository implements IMenu {
  private pool!: sql.ConnectionPool;

  constructor() {
    Connection.connect().then((pool) => (this.pool = pool));
  }

  async read(id: number): Promise<MenuModel[]> {
    try {
      const request = await this.pool
        .request()
        .input("ou_cedula", sql.BigInt, id)
        .execute("SP_BUSCARMENUROL");

      const menu: MenuModel[] = request.recordset.map(
        (menu: {
          path: string;
          tabName: string;
          icon: string;
          component: string;
        }) => new MenuModel(menu.path, menu.tabName, menu.icon, menu.component)
      );

      return menu;
    } catch (error) {
      throw new Error("No se pudo obtener los menus" + error);
    }
  }
}
