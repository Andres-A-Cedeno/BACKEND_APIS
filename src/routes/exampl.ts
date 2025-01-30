import { Router } from "express";
import { registerUser, loginUser } from "../models/users/userModel";

export const exampleRouter = Router();

exampleRouter.post("/", registerUser);
exampleRouter.post("/login", loginUser);

export default exampleRouter;
