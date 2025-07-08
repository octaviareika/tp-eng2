"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const FuncionarioRepository_1 = require("../repositories/FuncionarioRepository");
const AlunoRepository_1 = require("../repositories/AlunoRepository");
class AuthController {
    async register(req, res) {
        try {
            const { nome, email, senha, tipo, matricula, curso, cargo } = req.body;
            if (!nome || !email || !senha || !tipo) {
                return res
                    .status(400)
                    .json({ message: "Campos obrigatórios faltando" });
            }
            if (tipo === "aluno") {
                if (!matricula || !curso) {
                    return res
                        .status(400)
                        .json({ message: "Matrícula e curso obrigatórios para aluno" });
                }
                const novoAluno = await (0, AlunoRepository_1.addAluno)({
                    nome,
                    email,
                    senha,
                    matricula,
                    curso,
                });
                return res
                    .status(201)
                    .json({ message: "Aluno registrado com sucesso!", aluno: novoAluno });
            }
            else if (tipo === "funcionario") {
                if (!cargo) {
                    return res
                        .status(400)
                        .json({ message: "Cargo obrigatório para funcionário" });
                }
                const novoFuncionario = await (0, FuncionarioRepository_1.addFuncionario)({
                    nome,
                    email,
                    senha,
                    cargo,
                });
                return res.status(201).json({
                    message: "Funcionário registrado com sucesso!",
                    funcionario: novoFuncionario,
                });
            }
            else {
                return res
                    .status(400)
                    .json({ message: "Tipo inválido. Use 'aluno' ou 'funcionario'" });
            }
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: "Erro ao cadastrar!", error: error.message });
        }
    }
    async login(req, res) {
        try {
            const { email, senha } = req.body;
            if (!email || !senha) {
                return res.status(400).json({ message: "Email e Senha obrigatórios!" });
            }
            const aluno = await AlunoRepository_1.alunoRepository.findOneBy({ email });
            if (aluno && aluno.senha === senha) {
                req.session.usuario = {
                    id: aluno.id,
                    nome: aluno.nome,
                    tipo: "aluno",
                    matricula: aluno.matricula,
                    curso: aluno.curso,
                };
                return res.status(200).json({ message: "Login realizado como aluno" });
            }
            const funcionario = await FuncionarioRepository_1.funcionarioRepository.findOneBy({ email });
            if (funcionario && funcionario.senha === senha) {
                req.session.usuario = {
                    id: funcionario.id,
                    nome: funcionario.nome,
                    tipo: "funcionario",
                    cargo: funcionario.cargo,
                };
                return res
                    .status(200)
                    .json({ message: "Login realizado como funcionário" });
            }
            return res.status(401).json({ message: "Credenciais inválidas!" });
        }
        catch (error) {
            return res
                .status(500)
                .json({ message: "Erro ao fazer login", error: error.message });
        }
    }
    async logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Erro ao deslogar" });
            }
            res.clearCookie("connect.sid");
            return res.status(200).json({ message: "Logout realizado" });
        });
    }
}
exports.AuthController = AuthController;
