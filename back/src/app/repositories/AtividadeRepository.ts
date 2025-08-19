import { Atividade, StatusAtividade } from "../entities/Atividade";
import { IAtividade } from "../interfaces/IAtividade";
import { AppDataSource } from "../../database/data-source";
import { CategoriaAtividade } from "../entities/Categoria-Atividade";
import { Aluno } from "../entities/Aluno";

const atividadeRepository = AppDataSource.getRepository(Atividade);
const categoriaRepository = AppDataSource.getRepository(CategoriaAtividade);
const alunoRepository = AppDataSource.getRepository(Aluno);

export const addAtividade = async (dados: Omit<IAtividade, "id">) => {
  const aluno = await alunoRepository.findOneBy({
    matricula: dados.alunoMatricula,
  });
  if (!aluno) throw new Error("Aluno não encontrado");

  const categoria = await categoriaRepository.findOneBy({
    nome: dados.categoriaNome,
  });
  if (!categoria) throw new Error("Categoria não encontrada.");

  const novaAtividade = atividadeRepository.create({
    titulo: dados.titulo,
    descricao: dados.descricao,
    dataInicio: dados.dataInicio,
    dataFim: dados.dataFim,
    status: dados.status,
    documentoComprovanteUrl: dados.documentoComprovanteUrl,
    aluno: aluno,
    categoria: categoria,
  });

  return await atividadeRepository.save(novaAtividade);
};

export const deleteAtividadePendente = async (id: number, alunoId: number) => {
  const atividade = await atividadeRepository.findOne({
    where: { id: id, aluno: { id: alunoId }, status: StatusAtividade.PENDENTE },
  });
  if (!atividade) {
    throw new Error("Atividade não encontrada");
  }
  return await atividadeRepository.remove(atividade);
};

export { atividadeRepository };
