import { Funcionario } from "../entities/Funcionario";
import { IFuncionario } from "../interfaces/IFuncionario";
import { AppDataSource } from "../../database/data-source";

const funcionarioRepository = AppDataSource.getRepository(Funcionario);

export const addFuncionario = async (dados: Omit<IFuncionario, "id">) => {
  if (await funcionarioRepository.findOneBy({ email: dados.email }))
    throw new Error("Email já está cadastrado!");
  const novoFuncionario = funcionarioRepository.create(dados);
  return await funcionarioRepository.save(novoFuncionario);
};

export { funcionarioRepository };
