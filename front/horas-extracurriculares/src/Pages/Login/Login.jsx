import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoUfop from '../assets/logo-ufop.png';
import styles from '../css/login.module.css';

const Login = () => {
  const [Login, setLogin] = useState("");
  const [Senha, setSenha] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState("");

  return (
    <div className={styles.loginContainer}>
      <div className={styles.content}>
        <form className={styles.formContainer}>
          <div className={styles.leftDiv}>
            <img className={styles.logoUfop} src={logoUfop} alt="Logo da UFOP" />
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
                          <input type="radio" 
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
                            value={Login}
                            onChange={(e) => setLogin(e.target.value)}
                            placeholder="Digite o seu usuário"
                        />
                      </div>
                  
                      <div className={styles.login}>
                        <label>Senha: </label>
                        <input
                            type="password"
                            value={Senha}
                            onChange={(e) => setSenha(e.target.value)}
                            placeholder="Digite a sua senha"
                        />
                      </div>
                  
                  <div>
                      <button type="button" className={styles.botaoCC}>Criar conta</button>
                    <Link to="/ActivityForm">
                      <button type="submit" className={styles.botaoEntrar}>Entrar</button>
                    </Link>
                  </div>

              </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
