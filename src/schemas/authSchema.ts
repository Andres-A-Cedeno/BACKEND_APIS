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

const nameSchema = pipe(
  string(),
  minLength(3, "El nombre debe tener al menos 3 caracteres"),
  maxLength(50, "El nombre no puede tener más de 50 caracteres")
);
const lastNameSchema = pipe(
  string(),
  minLength(3, "El apellido debe tener 3 caracteres"),
  maxLength(50, "El apellido no puede tener más de 50 caracteres")
);
const emailSchema = pipe(string());
const passwordSchema = pipe(string(), minLength(3), maxLength(50));
const nicknameSchema = pipe(string(), minLength(3), maxLength(50));
const departmentSchema = pipe(number());

/**
 * Schema para validar los datos del usuario.
 */
export const authSchema = object({
  dni: dniSchema,
  name: nameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  password: passwordSchema,
  nickname: nicknameSchema,
  department: departmentSchema,
});

export const authLoginSchema = object({
  email: emailSchema,
  password: passwordSchema,
});

/**
 * Schema para validar los datos del usuario al registrarse.
 * Incluye los datos del usuario y el token de refresco.
 */
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

/**
 * Schema para validar los datos del usuario al realizar el login.
 * Incluye el email y la contraseña del usuario.
 * @param {string} email El email del usuario.
 * @param {string} password La contraseña del usuario.
 *
 */
export type UserLogin = {
  email: string;
  password: string;
};
