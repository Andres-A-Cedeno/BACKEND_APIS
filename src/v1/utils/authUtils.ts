import { hash, compare } from "bcrypt";
import { safeParse } from "valibot";
import { authSchema, authLoginSchema } from "../schemas/authSchema";
import type { UserRegister, UserLogin } from "../models/users/userModel";

export const validateUserData = (userData: UserRegister | UserLogin) => {
  const schema = "password" in userData ? authSchema : authLoginSchema;
  const userDataValidated = safeParse(schema, userData);

  if (!userDataValidated.success) {
    throw new Error(userDataValidated.issues[0].message);
  }
};

export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, 10);
};

export const comparePasswords = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  return await compare(plainPassword, hashedPassword);
};
