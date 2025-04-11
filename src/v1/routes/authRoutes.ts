import { Router } from "express";
import {
  infoUserController,
  loginUserController,
  registerUserController,
} from "../controllers/auth/authController";

export const authRoutes = Router();

authRoutes.post("auth/register", registerUserController);
authRoutes.post("auth/login", loginUserController);
//authRoutes.post("/get-info", infoUserController);

export default authRoutes;
