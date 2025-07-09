import { Router } from "express";
import multer from "multer";
import { AlunoController } from "../controllers/AlunoController";
import { CategoriaController } from "../controllers/CategoriaController";
import { AtividadeController } from "../controllers/AtividadeController";
import { AuthController } from "../controllers/AuthController";
import { FuncionarioController } from "../controllers/FuncionarioController";

const routes: Router = Router();
const upload = multer({ dest: "uploads/" }); // pasta onde os arquivos serão salvos

const alunoController = new AlunoController();
const categoriaController = new CategoriaController();
const atividadeController = new AtividadeController();
const funcionarioController = new FuncionarioController();
const authController = new AuthController();

routes.post("/categoria", categoriaController.create);
routes.post(
  "/atividade",
  upload.single("documentoComprovanteUrl"),
  atividadeController.create
);
routes.post("/register", authController.register);
routes.post("/login", authController.login);
routes.post("/logout", authController.logout);
routes.get(
  "/Funcionario/AtividadesPendentes",
  funcionarioController.getAtividadesPendentes
);

export { routes };
