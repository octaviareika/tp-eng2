import { Atividade } from "../entities/Atividade";

export interface IAluno {
  id: number;
  nome: string;
  email: string;
  matricula: string;
  curso: string;
  senha: string;
  atividades: Atividade[];
}
