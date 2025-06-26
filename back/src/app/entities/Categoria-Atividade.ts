import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

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
}
