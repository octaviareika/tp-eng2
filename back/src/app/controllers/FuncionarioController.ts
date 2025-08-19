import { Request, Response } from "express";
import { atividadeRepository } from "../repositories/AtividadeRepository";
import { StatusAtividade } from "../entities/Atividade";

export class FuncionarioController {
  getAtividadesPendentes = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    try {
      const atividadesPendentes = await atividadeRepository
        .createQueryBuilder("atividade")
        .leftJoin("atividade.aluno", "aluno")
        .leftJoin("atividade.categoria", "categoria")
        .select([
          "atividade.id",
          "atividade.titulo",
          "atividade.descricao",
          "atividade.dataInicio",
          "atividade.dataFim",
          "atividade.status",
          "atividade.dataSubmissao",
          "atividade.documentoComprovanteUrl",
          "atividade.horasAprovadas",
          "aluno.id",
          "aluno.nome",
          "aluno.matricula",
          "aluno.email",
          "aluno.curso",
          "categoria.id",
          "categoria.nome",
        ])
        .where("atividade.status = :status", {
          status: StatusAtividade.PENDENTE,
        })
        .orderBy("atividade.dataSubmissao", "ASC")
        .getMany();

      res.status(200).json(atividadesPendentes);
    } catch (error: any) {
      console.error("Erro ao buscar atividades pendentes:", error);
      res.status(500).json({
        message: "Erro ao buscar atividades pendentes",
        error: error?.message ?? "Erro desconhecido",
      });
    }
  };
  // async filtrarAtividades(...) { ... }

  atualizarStatusAtividade = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { id } = req.params;
    const { status, horasAprovadas } = req.body;

    if (
      ![StatusAtividade.APROVADO, StatusAtividade.REJEITADO].includes(status)
    ) {
      res
        .status(400)
        .json({ message: "Status inválido. Use 'Aprovado' ou 'Rejeitado'." });
      return;
    }

    try {
      const atividade = await atividadeRepository.findOne({
        where: { id: parseInt(id) },
      });

      if (!atividade) {
        res.status(404).json({ message: "Atividade não encontrada!" });
        return;
      }

      atividade.status = status;

      if (status == StatusAtividade.APROVADO) {
        if (typeof horasAprovadas !== "number" || horasAprovadas <= 0) {
          res
            .status(400)
            .json({ message: "Horas aprovadas deve ser maior que 0!" });
          return;
        }
        atividade.horasAprovadas = horasAprovadas;
      } else {
        atividade.horasAprovadas = 0;
      }

      await atividadeRepository.save(atividade);
      res.status(200).json({ message: "Status atualizado com sucesso!" });
    } catch (error: any) {
      console.error("Erro ao atualizar status da atividade.", error);
      res.status(500).json({
        message: "Erro ao atualizar o status da atividade",
        error: error?.message ?? "Erro desconhecido.",
      });
    }
  };
  getCurrentUserFuncionario = async (req: Request, res: Response) => {
    return res.json({ nome: req.session.usuario!.nome });
  };
}
