"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.alunoRepository = exports.addAluno = void 0;
const Aluno_1 = require("../entities/Aluno");
const data_source_1 = require("../../database/data-source");
const alunoRepository = data_source_1.AppDataSource.getRepository(Aluno_1.Aluno);
exports.alunoRepository = alunoRepository;
const addAluno = async (dados) => {
    if (await alunoRepository.findOneBy({ email: dados.email }))
        throw new Error("Email já está cadastrado!");
    if (await alunoRepository.findOneBy({ matricula: dados.matricula }))
        throw new Error("Matrícula já cadastrada!");
    const novoAluno = alunoRepository.create(dados);
    return await alunoRepository.save(novoAluno);
};
exports.addAluno = addAluno;
