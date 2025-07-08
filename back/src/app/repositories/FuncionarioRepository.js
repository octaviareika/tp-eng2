"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.funcionarioRepository = exports.addFuncionario = void 0;
const Funcionario_1 = require("../entities/Funcionario");
const data_source_1 = require("../../database/data-source");
const funcionarioRepository = data_source_1.AppDataSource.getRepository(Funcionario_1.Funcionario);
exports.funcionarioRepository = funcionarioRepository;
const addFuncionario = async (dados) => {
    if (await funcionarioRepository.findOneBy({ email: dados.email }))
        throw new Error("Email já está cadastrado!");
    const novoFuncionario = funcionarioRepository.create(dados);
    return await funcionarioRepository.save(novoFuncionario);
};
exports.addFuncionario = addFuncionario;
