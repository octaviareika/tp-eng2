import { CategoriaAtividade } from "../entities/Categoria-Atividade";
import { ICategoriaAtividade } from "../interfaces/ICategoria";
import { AppDataSource } from "../../database/data-source";
import { Atividade } from "../entities/Atividade";
import { In } from "typeorm";

const categoriaRepository = AppDataSource.getRepository(CategoriaAtividade);
const atividadeRepository = AppDataSource.getRepository(Atividade);

export const addCategoria = async (dados: Omit<ICategoriaAtividade, "id">) => {
  let atividades: Atividade[] = [];
  if (dados.atividadesIds && dados.atividadesIds.length > 0) {
    atividades = await atividadeRepository.findBy({
      id: In(dados.atividadesIds),
    });
    if (atividades.length !== dados.atividadesIds.length) {
      throw new Error("Uma ou mais atividades não encontradas.");
    }
  }

  const novaCategoria = categoriaRepository.create({
    nome: dados.nome,
    descricao: dados.descricao,
    horasMaximasAproveitaveis: dados.horasMaximasAproveitaveis,
    atividades: atividades,
  });
  return await categoriaRepository.save(novaCategoria);
};

export { categoriaRepository };
