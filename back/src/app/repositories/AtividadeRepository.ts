import { Atividade } from "../entities/Atividade";
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
    horasSolicitadas: dados.horasSolicitadas,
    dataInicio: dados.dataInicio,
    dataFim: dados.dataFim,
    status: dados.status,
    dataSubmissao: dados.dataSubmissao,
    documentoComprovanteUrl: dados.documentoComprovanteUrl,
    observacoesAluno: dados.observacoesAluno,
    aluno: aluno,
    categoria: categoria,
  });

  return await atividadeRepository.save(novaAtividade);
};

export { atividadeRepository };
