import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterAtividade1753652572354 implements MigrationInterface {
    name = 'AlterAtividade1753652572354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "atividades" ADD "comentario" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "atividades" DROP COLUMN "comentario"`);
    }

}
