import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateComentario1753656957029 implements MigrationInterface {
    name = 'CreateComentario1753656957029'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comentarios" ("id" SERIAL NOT NULL, "texto" text NOT NULL, "dataCriacao" TIMESTAMP NOT NULL DEFAULT now(), "autorNome" character varying, "atividade_id" integer, CONSTRAINT "PK_b60b1468bb275db8d5e875c4a78" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "atividades" DROP COLUMN "comentario"`);
        await queryRunner.query(`ALTER TABLE "comentarios" ADD CONSTRAINT "FK_76db59f1cd6eb3eb0681de38307" FOREIGN KEY ("atividade_id") REFERENCES "atividades"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comentarios" DROP CONSTRAINT "FK_76db59f1cd6eb3eb0681de38307"`);
        await queryRunner.query(`ALTER TABLE "atividades" ADD "comentario" text`);
        await queryRunner.query(`DROP TABLE "comentarios"`);
    }

}
