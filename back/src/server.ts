import "reflect-metadata";
import { AppDataSource } from "./database/data-source";
import express from "express";

const app = express();

import { routes } from "./app/routes/routes";

app.use(express.json());

app.use(routes);

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado com sucesso");

    app.listen(3000, () => {
      console.log("Server rodando!");
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco: ", error);
  });
