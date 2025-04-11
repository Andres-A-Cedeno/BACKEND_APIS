export class UserEntity {
  //Crea los datos del usuario, que datos son necesrios de la clase del user, flata getter y setter. ToJson
  /*
   * Terminar la clase, con los campos que estan en el backend
   * Getter y Setter
   * toJSON() --> metodo adicional
   */

  /**
   *
   */
  constructor(
    public dni: string,
    private name: string,
    private lastName: string,
    private state: boolean,
    private nickname: string,
    private email: string
  ) {}

  // Getters
  get getDni(): string {
    return this.dni
  }
  get getName(): string {
    return this.name
  }

  get getLastName(): string {
    return this.lastName
  }

  get getState(): boolean {
    return this.state
  }

  get getNickname(): string {
    return this.nickname
  }

  get getEmail(): string {
    return this.email
  }

  // Setters
  set setDni(value: string) {
    this.dni = value
  }

  set setName(value: string) {
    this.name = value
  }

  set setLastName(value: string) {
    this.lastName = value
  }

  set setState(value: boolean) {
    this.state = value
  }

  set setNickname(value: string) {
    this.nickname = value
  }

  set setEmail(value: string) {
    this.email = value
  }

  // Método toJSON
  toJSON() {
    return {
      dni: this.dni,
      name: this.name,
      lastName: this.lastName,
      state: this.state,
      nickname: this.nickname,
      email: this.email,
    }
  }
}
