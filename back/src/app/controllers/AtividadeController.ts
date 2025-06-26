import { Request, Response } from "express";
import {
  addAtividade,
  atividadeRepository,
} from "../repositories/AtividadeRepository";

class AtividadeController {
  create = async (req: Request, res: Response) => {
    try {
      // Se veio arquivo, pega o caminho salvo
      let documentoComprovanteUrl = undefined;
      if (req.file) {
        documentoComprovanteUrl = req.file.path;
      }

      const {
        titulo,
        descricao,
        dataInicio,
        dataFim,
        documentoComprovanteUrl,
        alunoMatricula,
        categoriaNome,
      } = req.body;

      if (
        !titulo ||
        !descricao ||
        !dataInicio ||
        !categoriaNome ||
        !alunoMatricula
      ) {
        return res.status(400).json({
          message:
            "Os seguintes campos são obrigatórios: titulo, descricao, dataInicio, alunoMatricula e categoriaNome",
        });
      }
      const novaAtividade = await addAtividade({
        titulo,
        descricao,
        dataInicio,
        dataFim,
        documentoComprovanteUrl,
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
