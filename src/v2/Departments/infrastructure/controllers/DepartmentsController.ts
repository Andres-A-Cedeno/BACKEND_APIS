import type { Request, Response } from "express";
import { DepartmentsUseCases } from "../../application/UseCases";
export class DepartmentController {
  private departmentUseCases: DepartmentsUseCases;
  constructor(departmentUseCases: DepartmentsUseCases) {
    this.departmentUseCases = departmentUseCases;
  }

  async getDepartments(req: Request, res: Response) {
    try {
      const departments = await this.departmentUseCases.getDepartments();
      res.status(200).json(departments);
    } catch (error) {
      res.status(400).json({ error: "Error al obtener los departamentos" });
    }
  }
}
