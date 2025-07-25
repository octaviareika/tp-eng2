import { Request, Response } from "express";
import { atividadeRepository } from "../repositories/AtividadeRepository";
import { StatusAtividade } from "../entities/Atividade";

export class FuncionarioController {
    //Carrega atividades pendentes para o funcionário em ordem de chegada
    getAtividadesPendentes = async(req: Request, res: Response): Promise<void> => {
        //Verificar se o usuário é funcionário 
        // if (!req.session?.usuario || req.session.usuario.tipo !== "funcionario") {
        //     res.status(403).json({ message: "Acesso não autorizado" });
        //     return;
        // }
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
                    "categoria.nome"
                ])
                .where("atividade.status = :status", { status: StatusAtividade.PENDENTE })
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


    }
    // async filtrarAtividades(...) { ... }
} 