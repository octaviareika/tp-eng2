import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Atividade } from "./Atividade";

@Entity("categorias_atividade")
export class CategoriaAtividade {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", unique: true })
  nome!: string;

  @Column({ type: "text", nullable: true })
  descricao?: string;

  @Column({ type: "int", nullable: true })
  horasMaximasAproveitaveis?: number;

  @OneToMany(() => Atividade, (atividade) => atividade.categoria)
  atividades!: Atividade[];
}
