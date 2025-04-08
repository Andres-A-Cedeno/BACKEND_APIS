import nodemailer from "nodemailer";
import { ENV } from "../../server/config/dbConfig";
export const CreateTransporter = () => {
  return nodemailer.createTransport({
    host: ENV.SMTP_HOST,
    port: Number(ENV.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: ENV.SMTP_USER,
      pass: ENV.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
};
