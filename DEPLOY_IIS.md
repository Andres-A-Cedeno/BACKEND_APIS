# Despliegue en IIS con iisnode

Este documento contiene las instrucciones para desplegar la aplicación en IIS utilizando iisnode.

## Requisitos previos

1. IIS instalado en el servidor Windows
2. iisnode instalado (https://github.com/Azure/iisnode/releases)
3. URL Rewrite Module para IIS (https://www.iis.net/downloads/microsoft/url-rewrite)
4. Node.js instalado en el servidor

## Pasos para el despliegue

1. Compilar la aplicación:
   ```
   npm run build
   ```

2. Copiar los siguientes archivos y carpetas al directorio de publicación en IIS:
   - La carpeta `dist/` completa
   - El archivo `web.config`
   - El archivo `package.json`
   - Cualquier otro archivo estático necesario

3. En el directorio de publicación, instalar las dependencias:
   ```
   npm install --production
   ```

4. Configurar un nuevo sitio web o aplicación en IIS:
   - Crear un nuevo sitio web o una aplicación dentro de un sitio existente
   - Establecer la ruta física al directorio donde se copiaron los archivos
   - Asignar un nombre de host si es necesario

5. Asegurarse de que el pool de aplicaciones esté configurado correctamente:
   - Modo Integrado
   - Sin Managed Code
   - Identity con permisos suficientes para ejecutar la aplicación

6. Verificar los permisos de archivos:
   - El usuario del pool de aplicaciones debe tener permisos de lectura y ejecución en todo el directorio de la aplicación
   - Permisos de escritura en las carpetas donde la aplicación necesita escribir (logs, uploads, etc.)

7. Reiniciar el sitio web en IIS

## Solución de problemas

- Revisar los logs de iisnode en la carpeta `iisnode/` dentro del directorio de la aplicación
- Verificar los logs de eventos de Windows
- Comprobar que todas las dependencias están instaladas correctamente
- Asegurarse de que los paths en el web.config son correctos

## Notas adicionales

- La aplicación está configurada para usar CommonJS en lugar de ES modules para mejor compatibilidad con iisnode
- El archivo web.config contiene la configuración necesaria para que IIS redirija las solicitudes a Node.js
- Si se necesita acceder a la aplicación desde una URL específica, ajustar la configuración de URL Rewrite en el web.config