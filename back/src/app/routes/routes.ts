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

    res.status(200).json({ message: "Login de teste realizado como ${tipo}" });
});

export { routes };
