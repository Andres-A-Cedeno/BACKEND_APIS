/**
 * Esquemas de validación para la autenticación de usuarios
 * Utilizando Valibot para garantizar la integridad de los datos
 */
import {
  object,
  string,
  email,
  minLength,
  maxLength,
  number,
  boolean,
  optional,
  enum_,
  pipe,
} from "valibot";
import { AuthEnumState } from "../enum/AuthEnum.js";

// Esquema para validar el DNI
const dniSchema = pipe(
  string(),
  minLength(10, "La cédula debe tener mínimo 10 caracteres"),
  maxLength(13, "La cédula debe tener máximo 13 caracteres")
);

// Esquema para validar el nombre
const nameSchema = pipe(
  string(),
  minLength(3, "El nombre debe tener al menos 3 caracteres"),
  maxLength(50, "El nombre no puede tener más de 50 caracteres")
);

// Esquema para validar el apellido
const lastNameSchema = pipe(
  string(),
  minLength(3, "El apellido debe tener al menos 3 caracteres"),
  maxLength(50, "El apellido no puede tener más de 50 caracteres")
);

// Esquema para validar el email
const emailSchema = pipe(
  string(),
  email("El formato del correo electrónico no es válido")
);

// Esquema para validar la contraseña
const passwordSchema = pipe(
  string(),
  minLength(3, "La contraseña debe tener al menos 3 caracteres") ||
    minLength(6, "La contraseña debe tener al menos 6 caracteres"),
  maxLength(50, "La contraseña no puede tener más de 50 caracteres")
);

// Esquema para validar el nickname
const nicknameSchema = pipe(
  string(),
  minLength(3, "El nickname debe tener al menos 3 caracteres"),
  maxLength(50, "El nickname no puede tener más de 50 caracteres")
);

// Esquema para validar el departamento
const departmentSchema = number() || string();

// Esquema para validar el estado
const statusSchema = enum_(AuthEnumState);

// Esquema para validar el rol
const roleSchema = number();

/**
 * Esquema para validar los datos del usuario al registrarse
 */
export const registerSchema = object({
  dni: dniSchema,
  name: optional(nameSchema),
  lastName: optional(lastNameSchema),
  email: optional(emailSchema),
  password: optional(passwordSchema),
  nickname: optional(nicknameSchema),
  departament: optional(departmentSchema),
  status: optional(statusSchema),
  role: optional(roleSchema),
});

/**
 * Esquema para validar los datos del usuario al iniciar sesión
 */
export const loginSchema = object({
  email: emailSchema,
  password: passwordSchema,
});

/**
 * Esquema para validar la solicitud de restablecimiento de contraseña
 */
export const passwordResetRequestSchema = object({
  email: emailSchema,
});

/**
 * Esquema para validar el token de restablecimiento de contraseña
 */
export const tokenVerificationSchema = object({
  token: pipe(string(), minLength(10, "El token no es válido")),
});

/**
 * Esquema para validar el restablecimiento de contraseña
 */
export const passwordResetSchema = object({
  email: emailSchema,
  newPassword: passwordSchema,
});
