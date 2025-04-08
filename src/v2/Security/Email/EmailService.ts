import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";
import { ENV } from "../../server/config/dbConfig";

export class EmailService {
  private static getTransporter() {
    // console.log(process.env.SMTP_SECURE_OLD);
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
        ciphers: "SSLv3",
      },
      // Configuración DKIM si está disponible
      ...(process.env.DKIM_PRIVATE_KEY && process.env.DKIM_DOMAIN_NAME
        ? {
            dkim: {
              domainName: process.env.DKIM_DOMAIN_NAME,
              keySelector: process.env.DKIM_SELECTOR || "default",
              privateKey: process.env.DKIM_PRIVATE_KEY,
            },
          }
        : {}),
    });
  }

  /**
   * Genera un ID único para el mensaje de correo
   * @param domain Dominio del remitente
   * @returns ID único para el mensaje
   */
  private static generateMessageId(domain: string): string {
    const uuid = uuidv4().replace(/-/g, "");
    return `<${uuid}@${domain}>`;
  }

  /**
   * Registra información sobre el envío de correo
   * @param to Destinatario
   * @param subject Asunto
   * @param success Éxito del envío
   * @param error Error (si existe)
   */
  private static logEmailSending(
    to: string,
    subject: string,
    success: boolean,
    error?: any
  ): void {
    const timestamp = new Date().toISOString();
    const status = success ? "✅ ÉXITO" : "❌ ERROR";
    console.log(
      `[${timestamp}] ${status} - Correo: "${subject}" enviado a: ${to}`
    );

    if (!success && error) {
      console.error(`Detalles del error:`, error);
    }
  }

  /**
   * Envía un correo electrónico para recuperación de contraseña
   * @param to Correo electrónico del destinatario
   * @param resetLink Enlace para restablecer la contraseña
   * @returns <boolean> True si se envía correctamente, false en caso de error
   */
  static async sendPasswordResetEmail(
    to: string,
    resetLink: string
  ): Promise<boolean> {
    try {
      // Extraer el dominio del remitente para generar Message-ID
      const senderEmail = process.env.SMTP_USER || "";
      const domain = senderEmail.split("@")[1] || "controlproyectos.com";

      // Generar un ID único para el mensaje
      const messageId = this.generateMessageId(domain);

      // Crear URL de cancelación para List-Unsubscribe
      const unsubscribeUrl = `${
        process.env.FRONTEND_URL || "http://localhost:3000"
      }/unsubscribe?email=${encodeURIComponent(to)}`;

      const mailOptions = {
        from: `"Sistema de Control de Proyectos" <${process.env.SMTP_USER}>`,
        to,
        subject: "Información de acceso a tu cuenta",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #333;">Recuperación de Contraseña</h2>
            <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
            <p>Haz clic en el siguiente enlace para crear una nueva contraseña:</p>
            <p>
              <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">
                Restablecer Contraseña
              </a>
            </p>
            <p>Este enlace expirará en 1 hora.</p>
            <p>Si no solicitaste este cambio, puedes ignorar este correo.</p>
            <p>Saludos,<br>Equipo de Control de Proyectos</p>
          </div>
        `,
        // Cabeceras importantes para evitar filtros de spam
        headers: {
          "Message-ID": messageId,
          Date: new Date().toUTCString(),
          "List-Unsubscribe": `<${unsubscribeUrl}>, <mailto:${process.env.SMTP_USER}?subject=unsubscribe>`,
          "X-Priority": "3", // Prioridad normal
          "X-MSMail-Priority": "Normal",
          "X-Mailer": "Control Proyectos Mailer",
          Precedence: "bulk",
        },
        // Versión de texto plano para clientes que no soportan HTML
        text: `Recuperación de Contraseña
        Hemos recibido una solicitud para restablecer tu contraseña.
        Para crear una nueva contraseña, visita este enlace: ${resetLink}

        Este enlace expirará en 1 hora.
        Si no solicitaste este cambio, puedes ignorar este correo.

        Saludos,
        Equipo de Control de Proyectos`,
      };

      const transporter = this.getTransporter();
      //console.log(transporter)
      // Enviar correo
      await transporter.sendMail(mailOptions);

      // Registrar el envío exitoso
      this.logEmailSending(to, mailOptions.subject, true);
      return true;
    } catch (error) {
      // Registrar el error
      this.logEmailSending(
        to,
        "Información de acceso a tu cuenta",
        false,
        error
      );
      console.error("❌ ERROR: Error al enviar correo de recuperación", error);
      return false;
    }
  }

  /**
   * Envía un correo electrónico de confirmación de cambio de contraseña
   * @param to Correo electrónico del destinatario
   * @returns Promise con el resultado del envío
   */
  static async sendPasswordChangedConfirmation(to: string): Promise<boolean> {
    try {
      // Extraer el dominio del remitente para generar Message-ID
      const senderEmail = process.env.SMTP_USER || "";
      const domain = senderEmail.split("@")[1] || "controlproyectos.com";

      // Generar un ID único para el mensaje
      const messageId = this.generateMessageId(domain);

      // Crear URL de cancelación para List-Unsubscribe
      const unsubscribeUrl = `${
        process.env.FRONTEND_URL || "http://localhost:3000"
      }/unsubscribe?email=${encodeURIComponent(to)}`;

      const mailOptions = {
        from: `"Sistema de Control de Proyectos" <${process.env.SMTP_USER}>`,
        to,
        subject: "Confirmación de actualización de cuenta",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
            <h2 style="color: #333;">Contraseña Actualizada</h2>
            <p>Tu contraseña ha sido actualizada correctamente.</p>
            <p>Si no realizaste este cambio, por favor contacta inmediatamente con el administrador del sistema.</p>
            <p>Saludos,<br>Equipo de Control de Proyectos</p>
          </div>
        `,
        // Cabeceras importantes para evitar filtros de spam
        headers: {
          "Message-ID": messageId,
          Date: new Date().toUTCString(),
          "List-Unsubscribe": `<${unsubscribeUrl}>, <mailto:${process.env.SMTP_USER}?subject=unsubscribe>`,
          "X-Priority": "3", // Prioridad normal
          "X-MSMail-Priority": "Normal",
          "X-Mailer": "Control Proyectos Mailer",
          Precedence: "bulk",
        },
        // Versión de texto plano para clientes que no soportan HTML
        text: `Confirmación de Actualización de Cuenta

        Tu contraseña ha sido actualizada correctamente.
        Si no realizaste este cambio, por favor contacta inmediatamente con el administrador del sistema.
        
        Saludos,
        Equipo de Control de Proyectos`,
      };

      const transporter = this.getTransporter();
      await transporter.sendMail(mailOptions);

      // Registrar el envío exitoso
      this.logEmailSending(to, mailOptions.subject, true);
      return true;
    } catch (error) {
      // Registrar el error
      this.logEmailSending(
        to,
        "Confirmación de actualización de cuenta",
        false,
        error
      );
      console.error("❌ ERROR: Error al enviar correo de confirmación", error);
      return false;
    }
  }
}
