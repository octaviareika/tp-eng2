"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const AlunoController_1 = require("../controllers/AlunoController");
const CategoriaController_1 = require("../controllers/CategoriaController");
const AtividadeController_1 = require("../controllers/AtividadeController");
const routes = (0, express_1.Router)();
exports.routes = routes;
const upload = (0, multer_1.default)({ dest: "uploads/" }); // pasta onde os arquivos serão salvos
const alunoController = new AlunoController_1.AlunoController();
const categoriaController = new CategoriaController_1.CategoriaController();
const atividadeController = new AtividadeController_1.AtividadeController();
routes.post("/Aluno", alunoController.create);
routes.post("/Categoria", categoriaController.create);
routes.post("/Atividade", upload.single("documentoComprovanteUrl"), atividadeController.create);
