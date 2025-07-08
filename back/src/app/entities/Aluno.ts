import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Atividade } from "./Atividade";

@Entity("alunos")
export class Aluno {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  nome!: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 20 })
  senha!: string;

  @Column({ type: "varchar", length: 20, unique: true })
  matricula!: string;

  @Column({ type: "varchar", length: 25, unique: true })
  curso!: string;

  @OneToMany(() => Atividade, (atividade) => atividade.aluno)
  atividades?: Atividade[];
}
