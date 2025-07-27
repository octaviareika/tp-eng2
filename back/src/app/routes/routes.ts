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


// Public routes (no authentication/authorization needed)
routes.post("/register", authController.register);
routes.post("/login", authController.login);
routes.post("/logout", authController.logout);

// Protected routes using middleware
// For creating a category (assuming only employees can do this)
routes.post("/categoria", isAuthenticated, isFuncionario, categoriaController.create);

// For submitting an activity (only by authenticated students)
routes.post(
  "/atividade",
  isAuthenticated,
  isAluno,
  upload.single("documentoComprovanteUrl"),
  atividadeController.create
);

// For getting pending activities (only by authenticated employees)
routes.get(
  "/funcionario",
  isAuthenticated,
  isFuncionario,
  funcionarioController.getAtividadesPendentes
);

// For updating activity status (only by authenticated employees)
routes.patch(
  "/funcionario/atividade/:id/status",
  isAuthenticated,
  isFuncionario,
  funcionarioController.atualizarStatusAtividade
);
// -----------------------------------------------------------------------
import { Request, Response, NextFunction } from 'express';

declare module 'express-session' {
    interface SessionData {
        usuario?: {
            id: number;
            nome: string;
            tipo: 'aluno' | 'funcionario';
            matricula?: string;
            curso?: string;
            cargo?: string;
        };
    }
}

routes.get("/login-teste/:tipo", (req: Request, res: Response) => {
    const { tipo } = req.params;

    // --- DADOS REAIS EXTRAÍDOS DO SEU BANCO DE DADOS ---
    const alunoTeste = {
        id: 2, // ID do Ciclano de Tal
        nome: "Ciclano de Tal",
        tipo: "aluno" as "aluno",
        matricula: "654321", // Matrícula do Ciclano de Tal
        curso: "Ciência da Computação" // Curso do Ciclano de Tal
    };

    const funcionarioTeste = {
        id: 1, // ID do Athos
        nome: "Athos",
        tipo: "funcionario" as "funcionario",
        cargo: "Especialista em Proteção" // Cargo do Athos
    };
    // ------------------------------------------

    if (tipo === "aluno") {
        req.session.usuario = alunoTeste;
    } else if (tipo === "funcionario") {
        req.session.usuario = funcionarioTeste;
    } else {
        return res.status(400).json({ message: "Tipo de usuário inválido para login de teste. Use 'aluno' ou 'funcionario'." });
    }

    res.status(200).json({ message: `Login de teste realizado como ${tipo}` });
});


export { routes };