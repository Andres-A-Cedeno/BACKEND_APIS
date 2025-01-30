import express from "express";
//import "dotenv/config";

const PORT = process.env.PORT || "";
const app = express();

app.use(express.json());

app.listen(3000, () => {
  console.log(`Servidor corrriendo en el puerto ${PORT}`);
});
