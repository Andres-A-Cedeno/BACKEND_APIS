import { IUser } from "../../domain/interface/User.interface"
import sql from "mssql"
import { Connection } from "../../../server/database/Connection"
import { UserEntity } from "../../domain/entities/User.entity"

interface UserData {
  dni: string
  name: string
  lastName: string
  state: boolean
  nickName: string
  email: string
  rol: string
  department: string
}

export class UserRepository implements IUser {
  private pool!: sql.ConnectionPool

  constructor() {
    Connection.connect().then((pool) => (this.pool = pool))
  }

  /**
   * Metodo que para obtener todos los usuarios
   */
  async getAllUser(): Promise<UserEntity[]> {
    try {
      const response = await this.pool.request().execute("SP_BUSCAR_USUARIOS")

      console.log(response)
      const userArray: UserEntity[] = response.recordset.map(
        (user: UserData) =>
          new UserEntity(
            user.dni,
            user.name,
            user.lastName,
            user.state,
            user.nickName,
            user.email
          )
      )
      return userArray
    } catch (error) {
      throw new Error("Error al obtener los usuarios" + error)
    }
  }

  async getUserByDni(id: string): Promise<UserEntity | null> {
    return new UserEntity(
      "1233",
      "tets",
      "tetst",
      true,
      "tetingg",
      "testing@test.com"
    )
  }
}
