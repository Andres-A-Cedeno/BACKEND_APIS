// import express from "express";
// import { setupSwagger } from "./src/index";
// import { authRoutes } from "./src/routes/authRoutes";
// import { protectedRoutes } from "./src/routes/protectedRoutes";
// import cors from "cors";
// import exampleRoutes from "./src/routes/example";

// const app = express();
// app.use(express.json());
// app.use(cors());

// //Se inicializa la documentación de la API
// //setupSwagger(app);

// //variables
// const PORT = process.env.PORT || "";

// app.use("/auth", authRoutes);
// app.use("/", protectedRoutes);
// app.use("/test", exampleRoutes);

// app.listen(PORT, () => {
//   console.log(`Servidor corrriendo en el puerto ${PORT}`);
// });

import { Server } from "./src/v2/server/server.js";

const server = new Server();
server.start();
