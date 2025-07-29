import { Request, Response } from "express";
import {
  addAtividade,
  atividadeRepository,
} from "../repositories/AtividadeRepository";

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

class AtividadeController {
  create = async (req: MulterRequest, res: Response) => {
    try {
      const { titulo, descricao, dataInicio, dataFim, categoriaNome } =
        req.body;

      const documentoComprovanteUrl = req.file ? req.file.path : undefined;

      if (!titulo || !descricao || !dataInicio || !categoriaNome) {
        return res.status(400).json({
          message:
            "Os seguintes campos são obrigatórios: titulo, descricao, dataInicio e categoriaNome",
        });
      }

      const alunoMatricula = req.session.usuario!.matricula as string;

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
      console.error("Erro ao criar atividade: ", error);
      return res
        .status(500)
        .json({ message: "Erro ao criar atividade", error: error.message });
    }
  };

  getAtividadesByAluno = async (req: Request, res: Response) => {
    try {
      const alunoId = req.session.usuario!.id;
      if (!alunoId) {
        return res
          .status(400)
          .json({ message: "ID do aluno não encontrado na sessão" });
      }

      const atividades = await atividadeRepository.find({
        where: { aluno: { id: alunoId } },
        relations: ["categoria"],
        order: { dataSubmissao: "DESC" },
      });

      return res.status(200).json(atividades);
    } catch (error: any) {
      console.error("Erro ao buscar atividades do aluno:", error);
      return res.status(500).json({ message: "Erro ao buscar atividades" });
    }
  };
}

export { AtividadeController };