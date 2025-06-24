"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriaRepository = exports.addCategoria = void 0;
const Categoria_Atividade_1 = require("../entities/Categoria-Atividade");
const data_source_1 = require("../../database/data-source");
const Atividade_1 = require("../entities/Atividade");
const typeorm_1 = require("typeorm");
const categoriaRepository = data_source_1.AppDataSource.getRepository(Categoria_Atividade_1.CategoriaAtividade);
exports.categoriaRepository = categoriaRepository;
const atividadeRepository = data_source_1.AppDataSource.getRepository(Atividade_1.Atividade);
const addCategoria = async (dados) => {
    let atividades = [];
    if (dados.atividadesIds && dados.atividadesIds.length > 0) {
        atividades = await atividadeRepository.findBy({
            id: (0, typeorm_1.In)(dados.atividadesIds),
        });
        if (atividades.length !== dados.atividadesIds.length) {
            throw new Error("Uma ou mais atividades não encontradas.");
        }
    }
    const novaCategoria = categoriaRepository.create({
        nome: dados.nome,
        descricao: dados.descricao,
        horasMaximasAproveitaveis: dados.horasMaximasAproveitaveis,
        atividades: atividades,
    });
    return await categoriaRepository.save(novaCategoria);
};
exports.addCategoria = addCategoria;
