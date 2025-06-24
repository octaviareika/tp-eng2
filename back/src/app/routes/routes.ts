import { Router } from "express";
import multer from "multer";
import { AlunoController } from "../controllers/AlunoController";
import { CategoriaController } from "../controllers/CategoriaController";
import { AtividadeController } from "../controllers/AtividadeController";

const routes: Router = Router();
const upload = multer({ dest: "uploads/" }); // pasta onde os arquivos serão salvos


const alunoController = new AlunoController();
const categoriaController = new CategoriaController();
const atividadeController = new AtividadeController();

routes.post("/aluno", alunoController.create);
routes.post("/Categoria", categoriaController.create);
routes.post("/Atividade", upload.single("documentoComprovanteUrl"), atividadeController.create);

export { routes };
