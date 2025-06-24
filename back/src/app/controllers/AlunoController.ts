import { Request, Response } from "express";
import { addAluno, alunoRepository } from "../repositories/AlunoRepository";

class AlunoController {
  create = async (req: Request, res: Response) => {
    try {
      const { nome, email, matricula, curso } = req.body;

      if (!nome || !email || !matricula || !curso) {
        return res
          .status(400)
          .json({ message: "Todos os campos são obrigatórios" });
      }

      const novoAluno = await addAluno({ nome, email, matricula, curso });
      return res.status(201).json(novoAluno);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Erro ao criar aluno.", error: error.message });
    }
  };
}

export { AlunoController };
