import { Router } from "express";
import multer from "multer";
import { AlunoController } from "../controllers/AlunoController";
import { CategoriaController } from "../controllers/CategoriaController";
import { AtividadeController } from "../controllers/AtividadeController";
import { AuthController } from "../controllers/AuthController";
import { FuncionarioController } from "../controllers/FuncionarioController";
import { ComentarioController } from "../controllers/ComentarioController";
import {
  isAuthenticated,
  isAluno,
  isFuncionario,
} from "../middleware/authMiddleware";
import path from "path"

const routes: Router = Router();
const upload = multer({ dest: "uploads/" });

const alunoController = new AlunoController();
const categoriaController = new CategoriaController();
const atividadeController = new AtividadeController();
const funcionarioController = new FuncionarioController();
const authController = new AuthController();
const comentarioController = new ComentarioController();

// Rotas publicas (não precisa de autenticação)
routes.post("/register", authController.register);
routes.post("/login", authController.login);
routes.post("/logout", authController.logout);

// Rotas protegidas usando middleware
// Para criar categoria (considerando que apenas funcionarios podem fazer isso)
routes.post(
  "/categoria",
  isAuthenticated,
  isFuncionario,
  categoriaController.create
);

// Para adicionar uma atividade (apenas estudantes autenticados)
routes.post(
  "/atividade",
  isAuthenticated,
  isAluno,
  upload.single("documentoComprovanteUrl"),
  atividadeController.create
);

// Para ver atividades criadas pelo proprio aluno -pagina inicial do aluno (apenas alunos autenticados)
routes.get(
  "/aluno",
  isAuthenticated,
  isAluno,
  atividadeController.getAtividadesByAluno
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

// para adicionar um comentário a uma atividade (apenas funcionários autenticados)
routes.post(
  "/comentario",
  isAuthenticated,
  isFuncionario,
  comentarioController.create
);

routes.get("/download/:filename",
  isAuthenticated,
  isFuncionario,
  (req, res) => {
    const filename = req.params.filename;
    const filePath = path.join(__dirname, "..", "..", "..", "uploads", filename);

    res.download(filePath, (err) => {
      if (err) {
        console.error("Erro ao fazer download:", err);
        return res
          .status(404)
          .json({ message: "Arquivo não encontrado ou erro no download." });
      }
    });
  }
)

export { routes };
