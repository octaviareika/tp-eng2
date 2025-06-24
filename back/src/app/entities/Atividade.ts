import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Aluno } from "./Aluno";
import { CategoriaAtividade } from "./Categoria-Atividade";

export enum StatusAtividade {
  PENDENTE = "Pendente",
  APROVADO = "Aprovado",
  REJEITADO = "Rejeitado",
  EM_REVISAO = "Em Revisao",
}

@Entity("atividades")
export class Atividade {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  titulo!: string;

  @Column({ type: "text" })
  descricao!: string;

  @Column("int")
  horasSolicitadas!: number;

  @Column({ type: "date" })
  dataInicio!: Date;

  @Column({ type: "date", nullable: true })
  dataFim?: Date;

  @Column({
    type: "enum",
    enum: StatusAtividade,
    default: StatusAtividade.PENDENTE,
  })
  status!: StatusAtividade;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  dataSubmissao!: Date;

  @Column({ nullable: true })
  documentoComprovanteUrl?: string;

  @Column({ type: "text", nullable: true })
  observacoesAluno?: string;

  @ManyToOne(() => Aluno, (aluno) => aluno.atividades)
  @JoinColumn({ name: "aluno_id" })
  aluno!: Aluno;

  @ManyToOne(() => CategoriaAtividade, (categoria) => categoria.atividades)
  @JoinColumn({ name: "categoria_id" })
  categoria!: CategoriaAtividade;
}
