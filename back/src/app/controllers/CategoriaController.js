"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaController = void 0;
const CategoriaRepository_1 = require("../repositories/CategoriaRepository");
class CategoriaController {
    constructor() {
        this.create = async (req, res) => {
            try {
                const { nome, descricao, horasMaximasAproveitaveis } = req.body;
                if (!nome) {
                    return res.status(400).json({ message: "O campo nome é obrigatório." });
                }
                const novaCategoria = await (0, CategoriaRepository_1.addCategoria)({
                    nome,
                    descricao,
                    horasMaximasAproveitaveis,
                });
                return res.status(201).json(novaCategoria);
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "Erro ao criar categoria.", error: error.message });
            }
        };
    }
}
exports.CategoriaController = CategoriaController;
