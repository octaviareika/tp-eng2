import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterComentario1753658768607 implements MigrationInterface {
    name = 'AlterComentario1753658768607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comentarios" ALTER COLUMN "autorNome" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comentarios" ALTER COLUMN "autorNome" DROP NOT NULL`);
    }

}
