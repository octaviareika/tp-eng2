import "reflect-metadata";
import { AppDataSource } from "./data-source"; // ajuste o caminho se necessário
import express from "express";

const app = express();

app.use(express.json());

app.listen(3000, () => console.log("Server is running"));

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
