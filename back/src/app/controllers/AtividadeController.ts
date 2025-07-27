import { Request, Response } from "express";
import {
  addAtividade,
  atividadeRepository,
} from "../repositories/AtividadeRepository";

class AtividadeController {
  create = async (req: Request, res: Response) => {
    try {
      if (req.session.usuario?.tipo === "funcionario") {
        return res
          .status(403)
          .json({ message: "Apenas alunos podem adicionar atividades" });
      }
      const {
        titulo,
        descricao,
        dataInicio,
        dataFim,
        documentoComprovanteUrl,
        categoriaNome,
      } = req.body;

      if (!titulo || !descricao || !dataInicio || !categoriaNome) {
        return res.status(400).json({
          message:
            "Os seguintes campos são obrigatórios: titulo, descricao, dataInicio e categoriaNome",
        });
      }

      const alunoMatricula = req.session.usuario?.matricula;
      if (!alunoMatricula) {
        return res
          .status(400)
          .json({ message: "Matrícula do aluno não encontrada na sessão" });
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
      console.error("Erro ao criar atividade:", error);
      return res
        .status(500)
        .json({ message: "Erro ao criar atividade", error: error.message });
    }
  };

  getAtividadesByAluno = async (req: Request, res: Response) => {
    console.log(">>> ROTA GET /atividades/aluno ACESSADA <<<"); // <--- Adicione esta linha

    try {
      // if (req.session.usuario?.tipo !== "aluno") {
      //   return res.status(403).json({ message: "Acesso não autorizado" });
      // }

      console.log("Cheguei aq")

      const alunoId = 1 
      if (!alunoId) {
        return res
          .status(400)
          .json({ message: "ID do aluno não encontrado na sessão" });
      }

      const atividades = await atividadeRepository.find({
        where: { aluno: { id: alunoId } },
        relations: ["categoria"], // Inclui os dados da categoria
        order: { dataSubmissao: "DESC" }, // Ordena pelas mais recentes
      });

      return res.status(200).json(atividades);
    } catch (error: any) {
      console.error("Erro ao buscar atividades do aluno:", error);
      return res.status(500).json({ message: "Erro ao buscar atividades" });
    }
  };
}

export { AtividadeController };