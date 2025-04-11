import type { Request, Response } from "express"
import { UserEntity } from "../../domain/entities/User.entity"
import { UserUseCases } from "../../application/User.use-cases"

export class UserController {
  //Pasar el repositorio
  constructor(private userUseCases: UserUseCases) {}
  //Crea los metodos de repository, y realizar la inyeccion de dependencias

  /**
   * Obtener todos los usuarios
   * @param req La solicitud HTTP
   * @param res La respuesta HTTP
   * @returns Lista de usuarios
   */
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users: UserEntity[] = await this.userUseCases.getAllUsers()
      res.status(200).json(users) //Retorno usuarios con estado 200 OK
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuarios", error })
    }
  }

  /**
   * Obtener un usuario por su DNI
   * @param req La solicitud HTTP
   * @param res La respuesta HTTP
   * @returns El usuario encontrado o mensaje de error
   */
  async getUserByDni(req: Request, res: Response): Promise<void> {
    const { dni } = req.params // El DNI se pasa como parámetro en la URL
    try {
      const user: UserEntity | null = await this.userUseCases.getUserByDni(dni)
      if (user) {
        res.status(200).json(user) // Retorna el usuario con estado 200 OK
      } else {
        res.status(404).json({ message: "Usuario no encontrado" }) // Si no se encuentra el usuario
      }
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el usuario", error })
    }
  }
}
