"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.atividadeRepository = exports.addAtividade = void 0;
const Atividade_1 = require("../entities/Atividade");
const data_source_1 = require("../../database/data-source");
const Categoria_Atividade_1 = require("../entities/Categoria-Atividade");
const Aluno_1 = require("../entities/Aluno");
const atividadeRepository = data_source_1.AppDataSource.getRepository(Atividade_1.Atividade);
exports.atividadeRepository = atividadeRepository;
const categoriaRepository = data_source_1.AppDataSource.getRepository(Categoria_Atividade_1.CategoriaAtividade);
const alunoRepository = data_source_1.AppDataSource.getRepository(Aluno_1.Aluno);
const addAtividade = async (dados) => {
    const aluno = await alunoRepository.findOneBy({
        matricula: dados.alunoMatricula,
    });
    if (!aluno)
        throw new Error("Aluno não encontrado");
    const categoria = await categoriaRepository.findOneBy({
        nome: dados.categoriaNome,
    });
    if (!categoria)
        throw new Error("Categoria não encontrada.");
    const novaAtividade = atividadeRepository.create({
        titulo: dados.titulo,
        descricao: dados.descricao,
        dataInicio: dados.dataInicio,
        dataFim: dados.dataFim,
        status: dados.status,
        documentoComprovanteUrl: dados.documentoComprovanteUrl,
        aluno: aluno,
        categoria: categoria,
    });
    return await atividadeRepository.save(novaAtividade);
};
exports.addAtividade = addAtividade;
