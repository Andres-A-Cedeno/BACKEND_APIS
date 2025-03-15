import type { IAuthUser } from "../domain/interfaces/IAuthUser.js";
import type { IUserRegister } from "../domain/interfaces/IUserRegister.js";

export class CreateAuthUser {
  constructor(private authRepository: IAuthUser) {}

  async login(email: string, password: string) {
    return await this.authRepository.login(email, password);
  }

  async register(registerData: IUserRegister) {
    // console.log("User data get it Application", registerData);
    return await this.authRepository.register(registerData);
  }
}
