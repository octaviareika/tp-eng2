import { Aluno } from "../entities/Aluno";
import { CategoriaAtividade } from "../entities/Categoria-Atividade";
import { StatusAtividade } from "../entities/Atividade";

export interface IAtividade {
  id: number;
  titulo: string;
  descricao: string;
  horasSolicitadas: number;
  dataInicio: Date;
  dataFim?: Date;
  status: StatusAtividade;
  dataSubmissao: Date;
  documentoComprovanteUrl?: string;
  observacoesAluno?: string;
  alunoMatricula: string;
  categoriaNome: string;
}
