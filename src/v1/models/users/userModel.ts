export interface UserRegister {
  dni: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  nickname: string;
  department: number;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  CEDULA: string;
  NOMBRES_COMPLETOS: string;
}
