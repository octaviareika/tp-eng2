import { Request, Response } from "express";
import { addAluno, alunoRepository } from "../repositories/AlunoRepository";

class AlunoController {
  getCurrentUserAluno = async (req: Request, res: Response) => {
    return res.json({ nome: req.session.usuario!.nome });
  };
}

export { AlunoController };
