import { Router } from "express";
import {
  loginUserController,
  registerUserController,
} from "../controllers/auth/authController";

export const exampleRouter = Router();

exampleRouter.post("/register", registerUserController);
exampleRouter.post("/login", loginUserController);

export default exampleRouter;
