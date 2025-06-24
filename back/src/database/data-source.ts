import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Aluno } from "../app/entities/Aluno";
import { CategoriaAtividade } from "../app/entities/Categoria-Atividade";
import { Atividade } from "../app/entities/Atividade";
import path from "path";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Aluno, CategoriaAtividade, Atividade],
  migrations: [path.join(__dirname, "migrations", "**", "*.ts")],
  synchronize: false,
  logging: true,
  subscribers: [],
});
