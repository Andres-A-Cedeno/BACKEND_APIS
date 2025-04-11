import { MenuModel } from "../domain/entities/MenuEntity";
import type { IMenu } from "../domain/interfaces/IMenu";

/**
 * Class to
 */
export class MenuUseCases {
  constructor(private menuRepository: IMenu) {}

  async getMenu(id: number): Promise<MenuModel[]> {
    return await this.menuRepository.read(id);
  }
}
