"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AtividadeController = void 0;
const AtividadeRepository_1 = require("../repositories/AtividadeRepository");
class AtividadeController {
    constructor() {
        this.create = async (req, res) => {
            try {
                const { titulo, descricao, horasSolicitadas, dataInicio, dataFim, status, dataSubmissao, documentoComprovanteUrl, observacoesAluno, alunoMatricula, categoriaNome, } = req.body;
                if (!titulo ||
                    !descricao ||
                    !horasSolicitadas ||
                    !dataInicio ||
                    !dataSubmissao ||
                    !categoriaNome ||
                    !alunoMatricula) {
                    return res.status(400).json({
                        message: "Os seguintes campos são obrigatórios: titulo, descricao, horasSolicitadas, dataInicio, dataSubmissao, alunoId e categoriaId",
                    });
                }
                const novaAtividade = await (0, AtividadeRepository_1.addAtividade)({
                    titulo,
                    descricao,
                    horasSolicitadas,
                    dataInicio,
                    dataFim,
                    status,
                    dataSubmissao,
                    documentoComprovanteUrl,
                    observacoesAluno,
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
//   id: number;
//   titulo: string;
//   descricao: string;
//   horasSolicitadas: number;
//   dataInicio: Date;
//   dataFim?: Date;
//   status: StatusAtividade;
//   dataSubmissao: Date;
//   documentoComprovanteUrl?: string;
//   observacoesAluno?: string;
//   aluno: Aluno;
//   categoria: CategoriaAtividade;
