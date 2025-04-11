import { MenuModel } from "../entities/MenuEntity";

export interface IMenu {
  //   create(
  //     pathMenu: string,
  //     titleScreen: string,
  //     iconMenu: string
  //   ): Promise<{
  //     message: string;
  //   }>;

  read(id: number): Promise<MenuModel[]>;

  //   update(
  //     idMenu: number,
  //     pathMenu: string,
  //     titleScreen: string,
  //     iconMenu: string
  //   ): Promise<MenuModel>;

  //   delete(idMenu: number): Promise<{ message: string }>;
}
