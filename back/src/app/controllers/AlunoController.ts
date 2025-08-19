import { Request, Response } from "express";
import {
  addAluno,
  alunoRepository,
  findAluno,
} from "../repositories/AlunoRepository";

class AlunoController {
  getCurrentUserAluno = async (req: Request, res: Response) => {
    try {
      const { nome, id } = req.session.usuario!;

      const aluno = await findAluno(nome, id);
      return res
        .status(200)
        .json({ message: "Aluno encontrado com sucesso!", nome: aluno.nome });
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Erro ao buscar aluno", error: error.message });
    }
  };
}

export { AlunoController };
