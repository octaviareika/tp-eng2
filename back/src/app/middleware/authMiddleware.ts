import { Request, Response, NextFunction } from 'express';

// Extend Request to include session type
declare module 'express-session' {
    interface SessionData {
        usuario?: {
            id: number;
            nome: string;
            tipo: 'aluno' | 'funcionario'; // Assuming these are your types
            matricula?: string;
            curso?: string;
            cargo?: string;
        };
    }
}

// Middleware para verificar se o usuário está autenticado
export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session || !req.session.usuario) {
        return res.status(401).json({ message: "Não autorizado: Sessão não encontrada ou inválida." });
    }
    next(); // Continue to the next middleware/route handler
};

// Middleware para verificar se o usuário é um aluno
export const isAluno = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session || !req.session.usuario || req.session.usuario.tipo !== "aluno") {
        return res.status(403).json({ message: "Acesso proibido: Apenas alunos podem realizar esta ação." });
    }
    next();
};

// Middleware para verificar se o usuário é um funcionário
export const isFuncionario = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session || !req.session.usuario || req.session.usuario.tipo !== "funcionario") {
        return res.status(403).json({ message: "Acesso proibido: Apenas funcionários podem realizar esta ação." });
    }
    next();
};