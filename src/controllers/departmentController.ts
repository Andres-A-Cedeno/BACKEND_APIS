import type { Request, Response } from "express";
import { departmentService } from "../services/departmentService";

export class departmentController {
  private departmentService: departmentService;

  constructor() {
    this.departmentService = new departmentService();
  }

  getDepartments = async (req: Request, res: Response): Promise<Response> => {
    try {
      const result = await this.departmentService.getAllDepartments();
      return res
        .status(200)
        .json({ message: "Departamentos obtenidos con exito", data: result });
    } catch (error) {
      console.error("Error en el registro:", error);
      if (error instanceof Error) {
        // console.error("Error en el registro:", error.message);
        return res.status(400).json({ message: error.message });
      }
      return res.status(400).json({ message: error });
    }
  };
}
