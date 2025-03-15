import type { IDepartments } from "../domain/interfaces/IDepartments";

export class DepartmentsUseCases {
  constructor(private departmentsRepository: IDepartments) {}

  async getDepartments() {
    return await this.departmentsRepository.getDepartments();
  }
}
