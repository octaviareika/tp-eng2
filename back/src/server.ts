import "reflect-metadata";
import { AppDataSource } from "./database/data-source";
import express from "express";
import cors from "cors";
import session from "express-session";

const app = express();

import { routes } from "./app/routes/routes";

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(
  session({
    secret: "chave-super-secreta",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: "lax" },
  })
);

app.use("/api", routes);

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
