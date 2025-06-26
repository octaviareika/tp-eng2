import { StatusAtividade } from "../entities/Atividade";

export interface IAtividade {
  id: number;
  titulo: string;
  descricao: string;
  dataInicio: Date;
  dataFim?: Date;
  status?: StatusAtividade;
  horasAprovadas?: number;
  documentoComprovanteUrl?: string;
  alunoMatricula: string;
  categoriaNome: string;
}
