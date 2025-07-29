import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { Atividade } from "./Atividade";

@Entity("comentarios")
export class Comentario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "text" })
  texto!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  dataCriacao!: Date;

  @ManyToOne(() => Atividade, (atividade) => atividade.comentarios, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "atividade_id" })
  atividade!: Atividade;

  @Column()
  autorNome!: string;
}
