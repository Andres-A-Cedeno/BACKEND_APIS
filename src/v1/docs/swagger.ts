import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import type { Express } from "express";

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CRM API",
      version: "1.0.0",
      description: "Documentación de la API para el CRM",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Archivos donde estarán las rutas documentadas
};

const swaggerSpec = swaggerJSDoc(options);

/**
 * Configura Swagger UI en el servidor Express
 * @param app Instancia de Express
 */
export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📄 Swagger UI disponible en http://localhost:3000/api-docs");
};
