import { Request, Response } from "express";
import { atividadeRepository } from "../repositories/AtividadeRepository";
import { StatusAtividade } from "../entities/Atividade";

export class FuncionarioController {
    //Carrega atividades pendentes para o funcionário em ordem de chegada
    getAtividadesPendentes = async(req: Request, res: Response): Promise<void> => {
        //Verificar se o usuário é funcionário 
        // if (!req.session?.usuario || req.session.usuario.tipo !== "funcionario") {
        //     return res.status(403).json({ message: "Acesso não autorizado" });
        // }
        try {
            const atividadesPendentes = await atividadeRepository.find({
                where: { status: StatusAtividade.PENDENTE },
                order: {dataSubmissao: "ASC"},
            });
            res.status(200).json(atividadesPendentes);
        } catch (error: any) {
            console.error("Erro ao buscar atividades pendentes:", error);
            res.status(500).json({message: "Erro ao buscar atividades pendentes", error: (error as Error).message ?? "Erro desconhecido",});
        }
    }
    // async filtrarAtividades(...) { ... }
} 