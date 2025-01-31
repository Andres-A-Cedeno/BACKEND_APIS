import { Router } from "express";
import { loginUserController } from "../controllers/auth/authController";

export const exampleRouter = Router();

exampleRouter.post("/login", loginUserController);

export default exampleRouter;
