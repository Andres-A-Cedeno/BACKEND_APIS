import { AuthEnumState } from "../enum/AuthEnum.js";

interface IAuthUser {
  email: string;
  password?: string;
  id?: string;
  nickname?: string;
  name?: string;
  status?: AuthEnumState;
  lastName?: string;
  dni?: string;
  departament?: string;
  role?: number;
  token?: string;
  refreshToken?: string;
}

export class AuthUser {
  private user: IAuthUser;

  constructor(user: IAuthUser) {
    this.user = user;
  }
}
