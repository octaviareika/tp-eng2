import { AppDataSource } from "../../database/data-source";
import { Comentario } from "../entities/Comentario";
import { IComentario } from "../interfaces/IComentario";
import { atividadeRepository } from "./AtividadeRepository";

const comentarioRepository = AppDataSource.getRepository(Comentario);

export const addComentario = async (dados: Omit<IComentario, "id">) => {
  const atividade = await atividadeRepository.findOneBy({
    id: dados.atividadeId,
  });
  if (!atividade) {
    throw new Error("Atividade não encontrada.");
  }

  const novoComentario = comentarioRepository.create({
    texto: dados.texto,
    atividade: atividade,
    autorNome: dados.autorNome,
  });

  return await comentarioRepository.save(novoComentario);
};

export { comentarioRepository };
