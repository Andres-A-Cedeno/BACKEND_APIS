import { UserEntity } from "../entities/User.entity"

export interface IUser {
  /**
   * Obtener todos los usuarios
   * @returns Una lista de todos los usuarios
   */
  getAllUser(): Promise<UserEntity[]>

  /**
   * Obtener un usuario por su DNI
   * @param dni El DNI del usuario
   * @returns El usuario encontrado o null si no existe
   */
  getUserByDni(dni: string): Promise<UserEntity | null>

  // /**
  //  * Crear un nuevo usuario
  //  * @param userData Los datos del nuevo usuario
  //  * @returns El usuario creado
  //  */
  // createUser(userData: UserEntity): Promise<{ message: string }>

  // /**
  //  * Actualizar los datos de un usuario existente
  //  * @param dni El DNI del usuario a actualizar
  //  * @param userData Los nuevos datos del usuario
  //  * @returns El usuario actualizado o null si no se encontró
  //  */
  // updateUser(
  //   dni: string,
  //   userData: Partial<UserEntity>
  // ): Promise<UserEntity | null>

  // /**
  //  * Eliminar un usuario
  //  * @param dni El DNI del usuario a eliminar
  //  * @returns El usuario eliminado o null si no se encontró
  //  */
  // deleteUser(dni: string): Promise<UserEntity | null>
}
