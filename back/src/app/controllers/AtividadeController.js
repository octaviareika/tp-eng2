"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtividadeController = void 0;
const AtividadeRepository_1 = require("../repositories/AtividadeRepository");
class AtividadeController {
    constructor() {
        this.create = async (req, res) => {
            try {
                const { titulo, descricao, dataInicio, dataFim, documentoComprovanteUrl, alunoMatricula, categoriaNome, } = req.body;
                if (!titulo ||
                    !descricao ||
                    !dataInicio ||
                    !categoriaNome ||
                    !alunoMatricula) {
                    return res.status(400).json({
                        message: "Os seguintes campos são obrigatórios: titulo, descricao, dataInicio, alunoMatricula e categoriaNome",
                    });
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
