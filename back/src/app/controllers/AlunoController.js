"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlunoController = void 0;
const AlunoRepository_1 = require("../repositories/AlunoRepository");
class AlunoController {
    constructor() {
        this.create = async (req, res) => {
            try {
                const { nome, email, matricula, curso } = req.body;
                if (!nome || !email || !matricula || !curso) {
                    return res
                        .status(400)
                        .json({ message: "Todos os campos são obrigatórios" });
                }
                const novoAluno = await (0, AlunoRepository_1.addAluno)({ nome, email, matricula, curso });
                return res.status(201).json(novoAluno);
            }
            catch (error) {
                return res
                    .status(500)
                    .json({ message: "Erro ao criar aluno.", error: error.message });
            }
        };
    }
}
exports.AlunoController = AlunoController;
