import { Atividade } from "../entities/Atividade";

export interface ICategoriaAtividade {
  id: number;
  nome: string;
  descricao?: string;
  horasMaximasAproveitaveis?: number;
}
