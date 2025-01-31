import express from "express";
import { setupSwagger } from "./src/index";
import { exampleRouter } from "./src/routes/exampl";

const app = express();
app.use(express.json());

//Se inicializa la documentación de la API
//setupSwagger(app);

//variables
const PORT = process.env.PORT || "";

app.use("/api", exampleRouter);

app.listen(PORT, () => {
  console.log(`Servidor corrriendo en el puerto ${PORT}`);
});
