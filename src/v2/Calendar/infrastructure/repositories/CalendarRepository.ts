import { Connection } from "../../../server/database/Connection";
import sql, { RequestError } from "mssql";
import type { ICalendar } from "../../domain/interfaces/ICalendar";
import type { CalendarEntity } from "../../domain/entities/CalendarEntity";
import { TypeProcess } from "../../../enums/typeProcess";
import { TaskEnumParams } from "../../domain/config/taskEnumsParams";

export class calendarRepository implements ICalendar {
  private pool!: sql.ConnectionPool;

  constructor() {
    Connection.connect().then((pool) => {
      this.pool = pool;
    });
  }

  async createTask(dataTask: CalendarEntity): Promise<{ message: string }> {
    try {
      const result = await this.pool
        .request()
        .input(TaskEnumParams.userDni, sql.BigInt, dataTask.userDni)
        .input(TaskEnumParams.clientDni, sql.BigInt, dataTask.clientDni)
        .input(TaskEnumParams.tittleTask, sql.VarChar, dataTask.tittleTask)
        .input(TaskEnumParams.createdAt, sql.Date, dataTask.createdAt)
        .input(TaskEnumParams.startTime, sql.VarChar, dataTask.startTime)
        .input(TaskEnumParams.endTime, sql.VarChar, dataTask.endTime)
        .input(TaskEnumParams.project, sql.VarChar, dataTask.project)
        .input(TaskEnumParams.section, sql.VarChar, dataTask.seccion)
        .input(TaskEnumParams.description, sql.VarChar, dataTask.description)
        .output(TaskEnumParams.response, sql.VarChar)
        .execute(TaskEnumParams.execution);

      return { message: "Task created successfully" };
    } catch (error: any) {
      if (error instanceof RequestError) {
        throw new Error(error.message);
      }
      throw new Error("Error al crear la tarea");
    }
  }

  async getTasks(): Promise<CalendarEntity["toJSON"][]> {
    console.log();
    try {
      return [];
    } catch (error) {
      if (error instanceof RequestError) {
        throw new Error(error.message);
      }
      throw new Error("Error al obtener las tareas");
    }
  }

  async getTaskById(): Promise<CalendarEntity["toJSON"] | null> {
    try {
      return null;
    } catch (error) {
      if (error instanceof RequestError) {
        throw new Error(error.message);
      }
      throw new Error("Error al obtener la tarea por id");
    }
  }

  async updateTask(): Promise<{ message: string }> {
    try {
      return { message: "Task updated successfully" };
    } catch (error) {
      if (error instanceof RequestError) {
        throw new Error(error.message);
      }
      throw new Error("Error al actualizar la tarea");
    }
  }

  async deleteTask(): Promise<{ message: string }> {
    try {
      return { message: "Task deleted successfully" };
    } catch (error) {
      if (error instanceof RequestError) {
        throw new Error(error.message);
      }
      throw new Error("Error al eliminar la tarea");
    }
  }
}
