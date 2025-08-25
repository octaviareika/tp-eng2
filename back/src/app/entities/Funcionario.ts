import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@Entity("funcionarios")
export class Funcionario {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 100 })
  nome!: string;

  @Column({ type: "varchar", length: 100, unique: true })
  email!: string;

  @Column({ type: "varchar", length: 20 })
  senha!: string;

  @Column({ type: "varchar", length: 25 })
  cargo!: string;
}
