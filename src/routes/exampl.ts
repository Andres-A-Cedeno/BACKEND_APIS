import { Router } from "express";
import { registerUser, loginUser } from "../models/users/userModel";
import { loginUserController } from "../controllers/auth/authController";

export const exampleRouter = Router();

exampleRouter.post("/", registerUser);
exampleRouter.post("/login", loginUserController);

export default exampleRouter;
