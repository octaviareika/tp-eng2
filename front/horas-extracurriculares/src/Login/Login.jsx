import React, { useState } from "react";
// 1. Importe o 'useNavigate' junto com o 'Link'
import { useNavigate } from "react-router-dom";
import logoUfop from "../assets/logo-ufop.png";
import styles from "../css/login.module.css";

const Login = () => {
  // Convenção: nomes de variáveis e estados começam com letra minúscula
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState("");
  // Estado para armazenar a mensagem de erro
  const [erro, setErro] = useState("");

  // 2. Inicialize o hook useNavigate
  const navigate = useNavigate();

  // 3. Crie a função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!login || !senha || !tipoPessoa) {
      setErro("Por favor, preencha todos os campos.");
      return;
    }

    setErro("");

    try {
      // Faz a chamada POST usando fetch para a sua API de login
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: login,
          senha: senha,
          tipo: tipoPessoa,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha no login");
      }

      const data = await response.json();

      // Armazena o token e o tipo de usuário no localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("userType", tipoPessoa);
      console.log("Login validado com sucesso!");

      // Agora, a navegação é condicional com base no tipo de usuário
      if (tipoPessoa === "aluno") {
        navigate("/aluno"); // Navega para a rota do aluno
      } else if (tipoPessoa === "funcionario") {
        navigate("/funcionario"); // Navega para a rota do funcionário
      }
    } catch (error) {
      setErro(error.message);
      console.error("Erro no login:", error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.content}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.leftDiv}>
            <div className={styles.divlogoUfop}>
              <img
                className={styles.logoUfop}
                src={logoUfop}
                alt="Logo da UFOP"
              />
            </div>
            <div className={styles.divForgotPassword}>
              <button type="button" className={styles.botaoForgotPassword}>
                Esqueci minha Senha
              </button>
              {erro && <p className={styles.mensagemErro}>{erro}</p>}
            </div>
          </div>

          <div className={styles.rightDiv}>
            <div className={styles.textBlock}>
              <h3>Bem-Vindo ao Portal de Atividades Extracurriculares UFOP</h3>
              <h4>
                Controle suas horas extracurriculares de forma simplificada
              </h4>
              <h5>Faça login para continuar</h5>
            </div>

            <div className={styles.inputs}>
              <div className={styles.pessoa}>
                <div>
                  <label>Aluno</label>
                  <input
                    type="radio"
                    name="pessoa"
                    value="aluno"
                    onChange={(e) => setTipoPessoa(e.target.value)}
                  />
                </div>
                <div>
                  <label>Funcionário</label>
                  <input
                    type="radio"
                    name="pessoa"
                    value="funcionario"
                    onChange={(e) => setTipoPessoa(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.login}>
                <label>Login: </label>
                <input
                  type="text"
                  value={login}
                  onChange={(e) => setLogin(e.target.value)}
                  placeholder="Digite o seu e-mail"
                />
              </div>

              <div className={styles.login}>
                <label>Senha: </label>
                <input
                  type="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  placeholder="Digite a sua senha"
                />
              </div>

              <div>
                <button type="button" className={styles.botaoCC}>
                  Criar conta
                </button>
                <button type="submit" className={styles.botaoEntrar}>
                  Entrar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
