import { Request, Response } from "express";
import {
  addCategoria,
  categoriaRepository,
} from "../repositories/CategoriaRepository";

class CategoriaController {
  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { nome, descricao, horasMaximasAproveitaveis } = req.body;

      if (!nome) {
        return res.status(400).json({ message: "O campo nome é obrigatório." });
      }

      const novaCategoria = await addCategoria({
        nome,
        descricao,
        horasMaximasAproveitaveis,
      });
      return res.status(201).json(novaCategoria);
    } catch (error: any) {
      return res
        .status(500)
        .json({ message: "Erro ao criar categoria.", error: error.message });
    }
  };
}

export { CategoriaController };
