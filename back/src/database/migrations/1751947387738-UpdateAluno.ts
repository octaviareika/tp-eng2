import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAluno1751947387738 implements MigrationInterface {
    name = 'UpdateAluno1751947387738'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alunos" ADD "senha" character varying(20) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "alunos" DROP COLUMN "senha"`);
    }

}
