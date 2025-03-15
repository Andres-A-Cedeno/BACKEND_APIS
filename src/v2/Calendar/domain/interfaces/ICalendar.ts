import { CalendarEntity } from "../entities/CalendarEntity";

export interface ICalendar {
  createTask(dataTask: CalendarEntity): Promise<{ message: string }>;
  updateTask(): Promise<{ message: string }>;
  getTasks(): Promise<CalendarEntity["toJSON"][]>;
  getTaskById(): Promise<CalendarEntity["toJSON"] | null>;
  deleteTask(): Promise<{ message: string }>;
}
