import { AuthEnumState } from "../enum/AuthEnum.js";

export interface IUserRegister {
  dni: string;
  nickname?: string;
  name?: string;
  lastName?: string;
  email?: string;
  password?: string;
  status?: AuthEnumState;
  departament?: number;
  departamentName?: string;
  role?: number;
}
