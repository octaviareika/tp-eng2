import React, { useState } from "react";
// 1. Importe o 'useNavigate' junto com o 'Link'
import { useNavigate } from "react-router-dom";
import logoUfop from '../assets/logo-ufop.png';
import styles from '../css/login.module.css';

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
  const handleSubmit = (event) => {
    // Impede que a página recarregue ao enviar o formulário
    event.preventDefault();

    // Lógica de validação
    if (!login || !senha || !tipoPessoa) {
      setErro("Por favor, preencha todos os campos.");
      return; // Para a execução da função aqui
    }

    // Se a validação passar, limpe o erro e navegue
    setErro("");
    console.log("Login validado com sucesso!");
    // Navega para a próxima página
    navigate("/ActivityForm");
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.content}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.leftDiv}>
            <img className={styles.logoUfop} src={logoUfop} alt="Logo da UFOP" />
            {erro && <p className={styles.mensagemErro}>{erro}</p>}
          </div>

          <div className={styles.rightDiv}>
            <div className={styles.textBlock}>
              <h3>Bem-Vindo ao Portal de Atividades Extracurriculares UFOP</h3>
              <h4>Controle suas horas extracurriculares de forma simplificada</h4>
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
                  placeholder="Digite o seu usuário"
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
                <button type="button" className={styles.botaoCC}>Criar conta</button>
                <button type="submit" className={styles.botaoEntrar}>Entrar</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;