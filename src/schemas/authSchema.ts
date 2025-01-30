// src/schemas/authSchema.ts
import {
  object,
  string,
  email,
  minLength,
  maxLength,
  number,
  pipe,
} from "valibot";

const dniSchema = pipe(
  string(),
  minLength(10, "La cedula debe tener minimo 10 caracteres"),
  maxLength(13, "La cedula debe tener maximo 13 caracteres")
);

const nameSchema = pipe(string(), minLength(3), maxLength(50));
const lastNameSchema = pipe(string(), minLength(3), maxLength(50));
const emailSchema = pipe(string(), email());
const passwordSchema = pipe(string(), minLength(8), maxLength(50));
const nicknameSchema = pipe(string(), minLength(3), maxLength(50));
const departmentSchema = pipe(number());

export const authSchema = object({
  dni: dniSchema,
  name: nameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  password: passwordSchema,
  nickname: nicknameSchema,
  department: departmentSchema,
});

export type UserRegister = {
  dni: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  nickname: string;
  department: number;
  status: string;
  role?: number;
  refreshToken?: string;
};

export type UserLogin = {
  email: string;
  password: string;
};
