import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { Aluno } from "./Aluno";
import { CategoriaAtividade } from "./Categoria-Atividade";
import { Comentario } from "./Comentario";

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

  @Column({ type: "int", nullable: true })
  horasAprovadas?: number;

  @ManyToOne(() => Aluno, (aluno) => aluno.atividades)
  @JoinColumn({ name: "aluno_id" })
  aluno!: Aluno;

  @ManyToOne(() => CategoriaAtividade)
  @JoinColumn({ name: "categoria_id" })
  categoria!: CategoriaAtividade;

  @OneToMany(() => Comentario, (comentario) => comentario.atividade)
  comentarios?: Comentario[];
}
