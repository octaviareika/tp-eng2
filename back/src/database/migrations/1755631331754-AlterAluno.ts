import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterAluno1755631331754 implements MigrationInterface {
  name = "AlterAluno1755631331754";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "alunos" DROP CONSTRAINT "UQ_f012d93a70d38af087147449698"`
    );
    await queryRunner.query(`ALTER TABLE "alunos" DROP COLUMN "curso"`);

    // ✅ Adicionar com DEFAULT para preencher registros existentes
    await queryRunner.query(
      `ALTER TABLE "alunos" ADD "curso" character varying(40) NOT NULL DEFAULT 'Não Informado'`
    );

    // ✅ Opcional: remover o default depois (se não quiser default para novos registros)
    await queryRunner.query(
      `ALTER TABLE "alunos" ALTER COLUMN "curso" DROP DEFAULT`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "alunos" DROP COLUMN "curso"`);
    await queryRunner.query(
      `ALTER TABLE "alunos" ADD "curso" character varying(25) NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "alunos" ADD CONSTRAINT "UQ_f012d93a70d38af087147449698" UNIQUE ("curso")`
    );
  }
}
