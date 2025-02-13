import type { Request, Response } from "express";
import { RequestError } from "mssql";
import { calendarService } from "../services/calendarService";

export class calendarController {
  private calendarService: calendarService;

  constructor() {
    this.calendarService = new calendarService();
  }

  getAllTask = async (req: Request, res: Response): Promise<Response> => {
    console.log("Datos obtenidos desde el frontend", req.body);
    try {
      const result = await this.calendarService.getAllTask();
      return res.status(200).json("Correcta");
    } catch (error) {
      if (error instanceof Error) {
        const errorMes = new RequestError(error.message);
        console.error(
          "Error en el registro este Controller:",
          errorMes.message
        );
        return res
          .status(401)
          .json({ error3: JSON.stringify(errorMes.message) });
      }
      return res.status(401).json({ error4: error });
    }
  };

  createTask = async (req: Request, res: Response): Promise<Response> => {
    console.log("Datos obtenidos desde el frontend", req.body);

    const data = req.body;
    try {
      const result = await this.calendarService.createTask(data);

      console.log("result", result);
      return res.status(200).json(req.body);
    } catch (error) {
      if (error instanceof Error) {
        const errorMes = new RequestError(error.message);
        console.error(
          "Error en el registro este Controller:",
          errorMes.message
        );
        return res
          .status(401)
          .json({ error3: JSON.stringify(errorMes.message) });
      }
      return res.status(401).json({ error4: error });
    }
  };
}
