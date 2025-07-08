"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtividadeController = void 0;
const AtividadeRepository_1 = require("../repositories/AtividadeRepository");
class AtividadeController {
    constructor() {
        this.create = async (req, res) => {
            var _a, _b;
            try {
                if (((_a = req.session.usuario) === null || _a === void 0 ? void 0 : _a.tipo) === "funcionario") {
                    return res
                        .status(403)
                        .json({ message: "Apenas alunos podem adicionar atividades" });
                }
                const { titulo, descricao, dataInicio, dataFim, documentoComprovanteUrl, categoriaNome, } = req.body;
                if (!titulo || !descricao || !dataInicio || !categoriaNome) {
                    return res.status(400).json({
                        message: "Os seguintes campos são obrigatórios: titulo, descricao, dataInicio e categoriaNome",
                    });
                }
                const alunoMatricula = (_b = req.session.usuario) === null || _b === void 0 ? void 0 : _b.matricula;
                if (!alunoMatricula) {
                    return res
                        .status(400)
                        .json({ message: "Matrícula do aluno não encontrada na sessão" });
                }
                const novaAtividade = await (0, AtividadeRepository_1.addAtividade)({
                    titulo,
                    descricao,
                    dataInicio,
                    dataFim,
                    documentoComprovanteUrl,
                    alunoMatricula,
                    categoriaNome,
                });
                return res.status(201).json(novaAtividade);
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "Erro ao criar atividade", error: error.message });
            }
        };
    }
}
exports.AtividadeController = AtividadeController;
