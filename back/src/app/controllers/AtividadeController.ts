import { Request, Response } from "express";
import {
  addAtividade,
  atividadeRepository,
} from "../repositories/AtividadeRepository";

class AtividadeController {
  create = async (req: Request, res: Response) => {
    try {
      const {
        titulo,
        descricao,
        horasSolicitadas,
        dataInicio,
        dataFim,
        status,
        dataSubmissao,
        documentoComprovanteUrl,
        observacoesAluno,
        alunoMatricula,
        categoriaNome,
      } = req.body;

      if (
        !titulo ||
        !descricao ||
        !horasSolicitadas ||
        !dataInicio ||
        !dataSubmissao ||
        !categoriaNome ||
        !alunoMatricula
      ) {
        return res.status(400).json({
          message:
            "Os seguintes campos são obrigatórios: titulo, descricao, horasSolicitadas, dataInicio, dataSubmissao, alunoId e categoriaId",
        });
      }

      const novaAtividade = await addAtividade({
        titulo,
        descricao,
        horasSolicitadas,
        dataInicio,
        dataFim,
        status,
        dataSubmissao,
        documentoComprovanteUrl,
        observacoesAluno,
        alunoMatricula,
        categoriaNome,
      });
      return res.status(201).json(novaAtividade);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Erro ao criar atividade", error: error.message });
    }
  };
}

export { AtividadeController };

//   id: number;
//   titulo: string;
//   descricao: string;
//   horasSolicitadas: number;
//   dataInicio: Date;
//   dataFim?: Date;
//   status: StatusAtividade;
//   dataSubmissao: Date;
//   documentoComprovanteUrl?: string;
//   observacoesAluno?: string;
//   aluno: Aluno;
//   categoria: CategoriaAtividade;
