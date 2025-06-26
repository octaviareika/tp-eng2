"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InicialSchema1750897559112 = void 0;
class InicialSchema1750897559112 {
    constructor() {
        this.name = 'InicialSchema1750897559112';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "categorias_atividade" ("id" SERIAL NOT NULL, "nome" character varying NOT NULL, "descricao" text, "horasMaximasAproveitaveis" integer, CONSTRAINT "UQ_98f8b9306640fc124e84109d599" UNIQUE ("nome"), CONSTRAINT "PK_bab0ddc41463df666e5c0b20766" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."atividades_status_enum" AS ENUM('Pendente', 'Aprovado', 'Rejeitado', 'Em Revisao')`);
        await queryRunner.query(`CREATE TABLE "atividades" ("id" SERIAL NOT NULL, "titulo" character varying NOT NULL, "descricao" text NOT NULL, "dataInicio" date NOT NULL, "dataFim" date, "status" "public"."atividades_status_enum" NOT NULL DEFAULT 'Pendente', "dataSubmissao" TIMESTAMP NOT NULL DEFAULT now(), "documentoComprovanteUrl" character varying, "horasAprovadas" integer, "aluno_id" integer, "categoria_id" integer, CONSTRAINT "PK_a6aaafbd59aa3ed64c5fa2b196b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "alunos" ("id" SERIAL NOT NULL, "nome" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "matricula" character varying(20) NOT NULL, "curso" character varying(25) NOT NULL, CONSTRAINT "UQ_1f9a8f3f4e5a314a2d7f828a605" UNIQUE ("email"), CONSTRAINT "UQ_6e0968af8b901a2773bf17aa366" UNIQUE ("matricula"), CONSTRAINT "UQ_f012d93a70d38af087147449698" UNIQUE ("curso"), CONSTRAINT "PK_0090f2d8573e71e8e4e274db905" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "atividades" ADD CONSTRAINT "FK_a96b03362bfb178c8390b14a455" FOREIGN KEY ("aluno_id") REFERENCES "alunos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "atividades" ADD CONSTRAINT "FK_cdce4c783cc126ee9e3ffb26616" FOREIGN KEY ("categoria_id") REFERENCES "categorias_atividade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "atividades" DROP CONSTRAINT "FK_cdce4c783cc126ee9e3ffb26616"`);
        await queryRunner.query(`ALTER TABLE "atividades" DROP CONSTRAINT "FK_a96b03362bfb178c8390b14a455"`);
        await queryRunner.query(`DROP TABLE "alunos"`);
        await queryRunner.query(`DROP TABLE "atividades"`);
        await queryRunner.query(`DROP TYPE "public"."atividades_status_enum"`);
        await queryRunner.query(`DROP TABLE "categorias_atividade"`);
    }
}
exports.InicialSchema1750897559112 = InicialSchema1750897559112;
