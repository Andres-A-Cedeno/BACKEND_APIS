import { Department } from "../entities/Department";
export interface IDepartments {
  getDepartments(): Promise<Department[]>;
  //Adicional metodos para poder poder crer o actualizar el departamento, o desactivarlo
}
