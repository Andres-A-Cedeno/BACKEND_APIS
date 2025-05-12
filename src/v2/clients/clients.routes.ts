import { Router } from "express";
import { ClientUseCases } from "./application/Client.use-cases";
import { ClientRepository } from "./infrastructure/repositories/Client.repository";
import { ClientController } from "./infrastructure/controllers/Client.controller";

const clientRoutes = Router();

const clientUseCases = new ClientUseCases(new ClientRepository());
const clientController = new ClientController(clientUseCases);

clientRoutes.get(
  "/get-clients",
  clientController.getClients.bind(clientController)
);

clientRoutes.post(
  "/create-client",
  clientController.createClient.bind(clientController)
);

export default clientRoutes;
