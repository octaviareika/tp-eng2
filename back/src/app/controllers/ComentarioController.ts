import { Request, Response } from "express";
import { addComentario } from "../repositories/ComentarioRepository";

class ComentarioController {
  create = async (req: Request, res: Response) => {
    try {
      const { texto, atividadeId } = req.body;

      if (!atividadeId || !texto) {
        return res.status(400).json({
          message: "Os seguintes campos são obrigatórios: texto e atividadeId.",
        });
      }
      const autorNome = req.session.usuario!.nome;

      const novoComentario = await addComentario({
        texto,
        atividadeId,
        autorNome,
      });

      return res.status(201).json(novoComentario);
    } catch (error: any) {
      console.error("Erro ao adicionar comentário: ", error);
      return res.status(500).json({
        message: "Erro ao adicionar comentário",
        error: error.message,
      });
    }
  };
}

export { ComentarioController };
