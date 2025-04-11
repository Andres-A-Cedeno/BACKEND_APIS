import { Router } from "express"
import { UserUseCases } from "./application/User.use-cases"
import { UserRepository } from "./infrastructure/repositories/User.repository"
import { UserController } from "./infrastructure/controllers/User.controller"

const userRoutes = Router()

const userUseCases = new UserUseCases(new UserRepository())
const userController = new UserController(userUseCases)

userRoutes.post("/getusers", userController.getAllUsers.bind(userController))
userRoutes.post(
  "/getusers/:id",
  userController.getUserByDni.bind(userController)
)
export default userRoutes
