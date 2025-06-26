"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Atividade = exports.StatusAtividade = void 0;
const typeorm_1 = require("typeorm");
const Aluno_1 = require("./Aluno");
const Categoria_Atividade_1 = require("./Categoria-Atividade");
var StatusAtividade;
(function (StatusAtividade) {
    StatusAtividade["PENDENTE"] = "Pendente";
    StatusAtividade["APROVADO"] = "Aprovado";
    StatusAtividade["REJEITADO"] = "Rejeitado";
    StatusAtividade["EM_REVISAO"] = "Em Revisao";
})(StatusAtividade || (exports.StatusAtividade = StatusAtividade = {}));
let Atividade = class Atividade {
};
exports.Atividade = Atividade;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Atividade.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Atividade.prototype, "titulo", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text" }),
    __metadata("design:type", String)
], Atividade.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date" }),
    __metadata("design:type", Date)
], Atividade.prototype, "dataInicio", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "date", nullable: true }),
    __metadata("design:type", Date)
], Atividade.prototype, "dataFim", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "enum",
        enum: StatusAtividade,
        default: StatusAtividade.PENDENTE,
    }),
    __metadata("design:type", String)
], Atividade.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" }),
    __metadata("design:type", Date)
], Atividade.prototype, "dataSubmissao", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Atividade.prototype, "documentoComprovanteUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], Atividade.prototype, "horasAprovadas", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Aluno_1.Aluno, (aluno) => aluno.atividades),
    (0, typeorm_1.JoinColumn)({ name: "aluno_id" }),
    __metadata("design:type", Aluno_1.Aluno)
], Atividade.prototype, "aluno", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Categoria_Atividade_1.CategoriaAtividade),
    (0, typeorm_1.JoinColumn)({ name: "categoria_id" }),
    __metadata("design:type", Categoria_Atividade_1.CategoriaAtividade)
], Atividade.prototype, "categoria", void 0);
exports.Atividade = Atividade = __decorate([
    (0, typeorm_1.Entity)("atividades")
], Atividade);
