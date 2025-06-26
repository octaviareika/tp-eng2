import { CategoriaAtividade } from "../entities/Categoria-Atividade";
import { ICategoriaAtividade } from "../interfaces/ICategoria";
import { AppDataSource } from "../../database/data-source";
import { Atividade } from "../entities/Atividade";
import { In } from "typeorm";

const categoriaRepository = AppDataSource.getRepository(CategoriaAtividade);
const atividadeRepository = AppDataSource.getRepository(Atividade);

export const addCategoria = async (dados: Omit<ICategoriaAtividade, "id">) => {
  const novaCategoria = categoriaRepository.create({
    nome: dados.nome,
    descricao: dados.descricao,
    horasMaximasAproveitaveis: dados.horasMaximasAproveitaveis,
  });
  return await categoriaRepository.save(novaCategoria);
};

export { categoriaRepository };
