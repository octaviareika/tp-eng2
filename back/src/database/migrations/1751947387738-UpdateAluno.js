"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAluno1751947387738 = void 0;
class UpdateAluno1751947387738 {
    constructor() {
        this.name = 'UpdateAluno1751947387738';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "alunos" ADD "senha" character varying(20) NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "alunos" DROP COLUMN "senha"`);
    }
}
exports.UpdateAluno1751947387738 = UpdateAluno1751947387738;
