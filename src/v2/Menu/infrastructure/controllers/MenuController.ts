import type { Request, Response } from "express";

import { MenuUseCases } from "../../application/MenuUseCases";

export class MenuController {
  constructor(private menuUseCases: MenuUseCases) {
    this.menuUseCases = menuUseCases;
  }

  async getMenu(req: Request, res: Response) {
    try {
      const { id } = req.body;

      const menus = await this.menuUseCases.getMenu(parseInt(id));

      res.status(200).json(menus);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
}
