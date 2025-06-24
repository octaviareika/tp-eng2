import { Aluno } from "../entities/Aluno";
import { IAluno } from "../interfaces/IAluno";
import { AppDataSource } from "../../database/data-source";

const alunoRepository = AppDataSource.getRepository(Aluno);

export const addAluno = async (dados: Omit<IAluno, "id" | "atividades">) => {
  const novoAluno = alunoRepository.create(dados);
  return await alunoRepository.save(novoAluno);
};

export { alunoRepository };
