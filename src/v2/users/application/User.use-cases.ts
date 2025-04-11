import { UserEntity } from "../domain/entities/User.entity"
import { IUser } from "../domain/interface/User.interface"

export class UserUseCases {
  //Inectar la dependencia
  constructor(private UserRepository: IUser) {}

  /**
   *
   * @returns Una promesa que resuelve con un array de objetos 'UserEntity', si no hay usuarios se retorna un array vacio.
   */
  async getAllUsers(): Promise<UserEntity[]> {
    return await this.UserRepository.getAllUser()
  }

  /**
   * Obtener un usuario por su DNI
   * @param dni El DNI del usuario
   * @returns El usuario encontrado
   */
  async getUserByDni(dni: string): Promise<UserEntity | null> {
    return await this.UserRepository.getUserByDni(dni)
  }

  /**
   * Crear un nuevo usuario
   * @param userData Los datos del nuevo usuario
   * @returns El usuario creado
   */
  // async createUser(userData: UserEntity): Promise<UserEntity> {
  //   // Aquí se pueden agregar validaciones o lógica de negocio antes de crear el usuario
  //   return await this.UserRepository.createUser(userData)
  // }

  // /**
  //  * Actualizar un usuario existente
  //  * @param dni El DNI del usuario a actualizar
  //  * @param userData Los nuevos datos del usuario
  //  * @returns El usuario actualizado
  //  */
  // async updateUser(dni: string, userData: Partial<UserEntity>): Promise<UserEntity | null> {
  //   // Verificamos que el usuario exista antes de actualizarlo
  //   const existingUser = await this.UserRepository.getUserByDni(dni)
  //   if (!existingUser) {
  //     throw new Error('Usuario no encontrado')
  //   }

  //   return await this.UserRepository.updateUser(dni, userData)
  // }

  // /**
  //  * Eliminar un usuario
  //  * @param dni El DNI del usuario a eliminar
  //  * @returns El usuario eliminado
  //  */
  // async deleteUser(dni: string): Promise<UserEntity | null> {
  //   const userToDelete = await this.UserRepository.getUserByDni(dni)
  //   if (!userToDelete) {
  //     throw new Error('Usuario no encontrado')
  //   }
  //   return await this.UserRepository.deleteUser(dni)
  // }
}
