import { Router } from "express";
import { AlunoController } from "../controllers/AlunoController";
import { CategoriaController } from "../controllers/CategoriaController";
import { AtividadeController } from "../controllers/AtividadeController";

const routes: Router = Router();

const alunoController = new AlunoController();
const categoriaController = new CategoriaController();
const atividadeController = new AtividadeController();

routes.post("/Aluno", alunoController.create);
routes.post("/Categoria", categoriaController.create);
routes.post("/Atividade", atividadeController.create);

export { routes };
