import express from "express";
import cors from "cors";
import { ENV } from "./config/dbConfig.js";
import { Connection } from "./database/Connection.js";

import authUserRoutes from "../authUser/authUserRoutes.js";
import userRoutes from "../users/user.routes.js";
import departmentRoutes from "../Departments/routesDepartments.js";
import rolesRoutes from "../Roles/RolesRoutes.js";
import menuRoutes from "../Menu/menu.routes.js";
import clientRoutes from "../clients/clients.routes.js";

export class Server {
  private app: express.Application;
  //private connection: Connection;
  private port = ENV.port || "3000";

  constructor() {
    this.app = express();
    this.app.use(express.json());
    //this.connection = new Connection();
    this.app.use(cors());
    this.routes();

    process.on("SIGINT", async () => {
      console.log(await Connection.closeConnection());
      process.exit(0);
    });
  }

  private routes() {
    this.app.use("/auth", authUserRoutes);
    this.app.use("/", departmentRoutes);
    this.app.use("/", rolesRoutes);
    this.app.use("/", menuRoutes);
    this.app.use("/", userRoutes);
    this.app.use("/", clientRoutes);
  }

  /**
   * Método que inicia el servidor
   */
  public async start() {
    //Primero se inicia la conexión con la base de datos
    //await this.connection.connect();

    this.app.listen(this.port, () => {
      console.log(`El servidor se está ejecutando en el puerto ${this.port}`);
    });
  }
}
