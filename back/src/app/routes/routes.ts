import { Router } from "express";
import multer from "multer";
import { AlunoController } from "../controllers/AlunoController";
import { CategoriaController } from "../controllers/CategoriaController";
import { AtividadeController } from "../controllers/AtividadeController";
import { AuthController } from "../controllers/AuthController";
import { FuncionarioController } from "../controllers/FuncionarioController";
import { isAuthenticated, isAluno, isFuncionario } from "../middleware/authMiddleware";

const routes: Router = Router();
const upload = multer({ dest: "uploads/" });

const alunoController = new AlunoController();
const categoriaController = new CategoriaController();
const atividadeController = new AtividadeController();
const funcionarioController = new FuncionarioController();
const authController = new AuthController();


// Rotas publicas (não precisa de atutenticação)
routes.post("/register", authController.register);
routes.post("/login", authController.login);
routes.post("/logout", authController.logout);

// Rotas protegidas usando middleware
// Para criar categoria (considerando que apenas funcionarios podem fazer isso)
routes.post("/categoria", isAuthenticated, isFuncionario, categoriaController.create);

// Para adicionar uma atividade (apenas estudantes autenticados)
routes.post(
  "/atividade",
  isAuthenticated,
  isAluno,
  upload.single("documentoComprovanteUrl"),
  atividadeController.create
);

// Para ver atividades pendentes -pagina inicial do funcionário- (apenas funcionarios autenticados)
routes.get(
  "/funcionario",
  isAuthenticated,
  isFuncionario,
  funcionarioController.getAtividadesPendentes
);

// para mudar o status de uma atividade (apenas funcionarios autenticados)
routes.patch(
  "/funcionario/atividade/:id/status",
  isAuthenticated,
  isFuncionario,
  funcionarioController.atualizarStatusAtividade
);

export { routes };