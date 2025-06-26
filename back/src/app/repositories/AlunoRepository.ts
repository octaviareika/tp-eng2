import { Aluno } from "../entities/Aluno";
import { IAluno } from "../interfaces/IAluno";
import { AppDataSource } from "../../database/data-source";

const alunoRepository = AppDataSource.getRepository(Aluno);

export const addAluno = async (dados: Omit<IAluno, "id" | "atividades">) => {
  if (await alunoRepository.findOneBy({ email: dados.email }))
    throw new Error("Email já está cadastrado!");
  if (await alunoRepository.findOneBy({ matricula: dados.matricula }))
    throw new Error("Matrícula já cadastrada!");
  const novoAluno = alunoRepository.create(dados);
  return await alunoRepository.save(novoAluno);
};

export { alunoRepository };
