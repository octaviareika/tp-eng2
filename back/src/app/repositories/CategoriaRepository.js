"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriaRepository = exports.addCategoria = void 0;
const Categoria_Atividade_1 = require("../entities/Categoria-Atividade");
const data_source_1 = require("../../database/data-source");
const Atividade_1 = require("../entities/Atividade");
const categoriaRepository = data_source_1.AppDataSource.getRepository(Categoria_Atividade_1.CategoriaAtividade);
exports.categoriaRepository = categoriaRepository;
const atividadeRepository = data_source_1.AppDataSource.getRepository(Atividade_1.Atividade);
const addCategoria = async (dados) => {
    const novaCategoria = categoriaRepository.create({
        nome: dados.nome,
        descricao: dados.descricao,
        horasMaximasAproveitaveis: dados.horasMaximasAproveitaveis,
    });
    return await categoriaRepository.save(novaCategoria);
};
exports.addCategoria = addCategoria;
