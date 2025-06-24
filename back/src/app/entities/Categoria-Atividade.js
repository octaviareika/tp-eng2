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
exports.CategoriaAtividade = void 0;
const typeorm_1 = require("typeorm");
const Atividade_1 = require("./Atividade");
let CategoriaAtividade = class CategoriaAtividade {
};
exports.CategoriaAtividade = CategoriaAtividade;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CategoriaAtividade.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", unique: true }),
    __metadata("design:type", String)
], CategoriaAtividade.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], CategoriaAtividade.prototype, "descricao", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true }),
    __metadata("design:type", Number)
], CategoriaAtividade.prototype, "horasMaximasAproveitaveis", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Atividade_1.Atividade, (atividade) => atividade.categoria),
    __metadata("design:type", Array)
], CategoriaAtividade.prototype, "atividades", void 0);
exports.CategoriaAtividade = CategoriaAtividade = __decorate([
    (0, typeorm_1.Entity)("categorias_atividade")
], CategoriaAtividade);
