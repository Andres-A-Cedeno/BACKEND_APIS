import type { Request, Response } from "express";

export class departmentController {
  getDepartments = async (req: Request, res: Response): Promise<Response> => {
    return res
      .status(200)
      .json({ message: "Departamentos obtenidos con exito" });
  };
}
