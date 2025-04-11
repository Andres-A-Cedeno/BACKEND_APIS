import type { Department } from "../models/departmentModel";
import { departmentRepository } from "../repositories/departmentRepository";

export class departmentService {
  private departmentRepo: departmentRepository;

  constructor() {
    this.departmentRepo = new departmentRepository();
  }
  getAllDepartments = async (): Promise<Department[]> => {
    try {
      const result = await this.departmentRepo.getAllDepartments();
      return result;
    } catch (error) {
      throw new Error("Error en la consulta: " + error);
    }
  };
}
