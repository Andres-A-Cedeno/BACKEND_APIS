import { calendarRepository } from "../repositories/calendarRepository";

export class calendarService {
  private calendarReposito: calendarRepository;

  constructor() {
    this.calendarReposito = new calendarRepository();
  }

  async getAllTask(data: any): Promise<any> {
    try {
      const result = await this.calendarReposito.getAllTask(data);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async createTask(data: any): Promise<any> {
    try {
      const result = await this.calendarReposito.createTask(data);
      return result;
    } catch (error) {
      throw error;
    }
  }
}
