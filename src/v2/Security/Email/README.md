# Servicio de Correo Electrónico para Recuperación de Contraseña

## Configuración

Para que el servicio de correo electrónico funcione correctamente, es necesario configurar las siguientes variables de entorno en el archivo `.env` del proyecto:

```
# Configuración SMTP
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=usuario@example.com
SMTP_PASSWORD=tu_contraseña

# URL del Frontend para los enlaces de recuperación
FRONTEND_URL=http://localhost:3000

# Configuración DKIM (opcional, para mejorar la entrega de correos)
# DKIM_DOMAIN_NAME=example.com
# DKIM_SELECTOR=default
# DKIM_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----
```

## Variables de Entorno

- **SMTP_HOST**: Dirección del servidor SMTP (ej. smtp.gmail.com, smtp.office365.com)
- **SMTP_PORT**: Puerto del servidor SMTP (generalmente 587 para TLS, 465 para SSL)
- **SMTP_SECURE**: Usar conexión segura (true para SSL, false para TLS/STARTTLS)
- **SMTP_USER**: Dirección de correo electrónico desde la que se enviarán los correos
- **SMTP_PASSWORD**: Contraseña o clave de aplicación para la cuenta de correo
- **FRONTEND_URL**: URL base del frontend donde se aloja la página de restablecimiento de contraseña
- **DKIM_DOMAIN_NAME**: (Opcional) Nombre de dominio para la firma DKIM
- **DKIM_SELECTOR**: (Opcional) Selector DKIM, generalmente "default" o "mail"
- **DKIM_PRIVATE_KEY**: (Opcional) Clave privada DKIM en formato PEM

## Mejoras Anti-Spam Implementadas

El servicio de correo electrónico incluye las siguientes mejoras para evitar que los correos sean marcados como spam:

1. **Cabeceras de correo optimizadas**:
   - Message-ID único para cada correo
   - Fecha correcta en formato UTC
   - List-Unsubscribe para permitir cancelar suscripción
   - Cabeceras de prioridad y precedencia

2. **Contenido optimizado**:
   - Versión en texto plano además del HTML
   - Asuntos que evitan palabras que activan filtros de spam
   - Estructura HTML limpia y bien formateada

3. **Soporte para DKIM** (opcional):
   - Permite firmar digitalmente los correos
   - Mejora significativamente la entrega y reputación

4. **Sistema de registro**:
   - Monitoreo de éxitos y errores en el envío
   - Registro detallado para diagnóstico de problemas

## Notas Importantes

1. Si utilizas Gmail, es recomendable usar una "Clave de aplicación" en lugar de la contraseña normal de la cuenta.
2. Para servicios como Gmail u Office 365, es posible que necesites habilitar el acceso de aplicaciones menos seguras o configurar la autenticación de dos factores y usar claves de aplicación.
3. Asegúrate de que el servidor SMTP no esté bloqueado por firewalls o restricciones de red.
4. Para implementar DKIM, necesitarás generar un par de claves y configurar los registros DNS de tu dominio.
5. Evita enviar correos masivos desde servidores compartidos para prevenir problemas de reputación.