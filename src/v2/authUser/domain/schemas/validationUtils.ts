/**
 * Utilidades para la validación de datos con Valibot
 */
import { ValiError, parse } from "valibot";
import {
  registerSchema,
  loginSchema,
  passwordResetRequestSchema,
  tokenVerificationSchema,
  passwordResetSchema,
} from "./authSchemas.js";
import type { IUserRegister } from "../interfaces/IUserRegister.js";

/**
 * Interfaz para los errores de validación
 */
export interface ValidationError {
  message: string;
  path?: string;
}

/**
 * Valida los datos de registro de usuario
 * @param data Datos del usuario a validar
 * @returns Objeto con los datos validados o errores de validación
 */
export function validateRegisterData(data: any): {
  isValid: boolean;
  data?: IUserRegister;
  errors?: ValidationError[];
} {
  try {
    const validatedData = parse(registerSchema, data);
    return {
      isValid: true,
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof ValiError) {
      const errors = error.issues.map((issue) => ({
        message: issue.message,
        path: issue.path?.map((p: any) => p.key).join("."),
      }));
      return {
        isValid: false,
        errors,
      };
    }
    return {
      isValid: false,
      errors: [{ message: "Error de validación desconocido" }],
    };
  }
}

/**
 * Valida los datos de inicio de sesión
 * @param email Email del usuario
 * @param password Contraseña del usuario
 * @returns Objeto con los datos validados o errores de validación
 */
export function validateLoginData(
  email: string,
  password: string
): {
  isValid: boolean;
  data?: { email: string; password: string };
  errors?: ValidationError[];
} {
  try {
    const validatedData = parse(loginSchema, { email, password });
    return {
      isValid: true,
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof ValiError) {
      const errors = error.issues.map((issue) => ({
        message: issue.message,
        path: issue.path?.map((p: any) => p.key).join("."),
      }));
      return {
        isValid: false,
        errors,
      };
    }
    return {
      isValid: false,
      errors: [{ message: "Error de validación desconocido" }],
    };
  }
}

/**
 * Valida el email para solicitud de restablecimiento de contraseña
 * @param email Email del usuario
 * @returns Objeto con el email validado o errores de validación
 */
export function validatePasswordResetRequestUtil(email: string): {
  isValid: boolean;
  data?: { email: string };
  errors?: ValidationError[];
} {
  console.log("Erorr en validatePasswordResetRquest");
  try {
    const validatedData = parse(passwordResetRequestSchema, { email });
    return {
      isValid: true,
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof ValiError) {
      const errors = error.issues.map((issue) => ({
        message: issue.message,
        path: issue.path?.map((p: any) => p.key).join("."),
      }));
      return {
        isValid: false,
        errors,
      };
    }
    return {
      isValid: false,
      errors: [{ message: "Error de validación desconocido" }],
    };
  }
}

/**
 * Valida el token para verificación de restablecimiento de contraseña
 * @param token Token de verificación
 * @returns Objeto con el token validado o errores de validación
 */
export function validateResetToken(token: string): {
  isValid: boolean;
  data?: { token: string };
  errors?: ValidationError[];
} {
  try {
    const validatedData = parse(tokenVerificationSchema, { token });
    return {
      isValid: true,
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof ValiError) {
      const errors = error.issues.map((issue) => ({
        message: issue.message,
        path: issue.path?.map((p: any) => p.key).join("."),
      }));
      return {
        isValid: false,
        errors,
      };
    }
    return {
      isValid: false,
      errors: [{ message: "Error de validación desconocido" }],
    };
  }
}

/**
 * Valida los datos para restablecimiento de contraseña
 * @param email Email del usuario
 * @param newPassword Nueva contraseña
 * @returns Objeto con los datos validados o errores de validación
 */
export function validatePasswordResetUtil(
  email: string,
  newPassword: string
): {
  isValid: boolean;
  data?: { email: string; newPassword: string };
  errors?: ValidationError[];
} {
  console.log("Erorr en validatePasswordReset");
  try {
    const validatedData = parse(passwordResetSchema, { email, newPassword });
    return {
      isValid: true,
      data: validatedData,
    };
  } catch (error) {
    if (error instanceof ValiError) {
      const errors = error.issues.map((issue) => ({
        message: issue.message,
        path: issue.path?.map((p: any) => p.key).join("."),
      }));
      return {
        isValid: false,
        errors,
      };
    }
    return {
      isValid: false,
      errors: [{ message: "Error de validación desconocido" }],
    };
  }
}
