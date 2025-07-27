/// <reference path="./types/express-session/index.d.ts" />

import "reflect-metadata";
import { AppDataSource } from "./database/data-source";
import express from "express";
import cors from "cors";
import session from "express-session"; // 1. Importar o express-session

const app = express();

import { routes } from "./app/routes/routes";

app.use(
  cors({
    origin: "http://localhost:3000", // O endereço do seu frontend
    credentials: true,
  })
);
app.use(express.json());

// 2. Adicionar o middleware da sessão ANTES das rotas


app.use("/api", routes); // <-- Suas rotas vêm depois da sessão

AppDataSource.initialize()
  .then(() => {
    console.log("Banco conectado com sucesso");

    app.listen(8080, () => {
      console.log("Server rodando!");
    });
  })
  .catch((error) => {
    console.error("Erro ao conectar ao banco: ", error);
  });