import React, { useState } from "react";
import logoUfop from '../assets/logo-ufop.png';

const Login = () => {
  const [Login, setLogin] = useState("");
  const [Senha, setSenha] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState("");

  return (

    <div className="content">
      <form className="form-container">
        <div className="left-div">
          <img className="logo-ufop" src={logoUfop} alt="Logo da UFOP" />
        </div>

        <div className="right-div">
            <div className="text-block">

                <h3>Bem-Vindo ao Portal de Atividades Extracurriculares UFOP</h3>
                <h4>Controle suas horas extracurriculares de forma simplificada</h4>
                <h5>Faça login para continuar</h5>
                
            </div>
            <div className="inputs">

                    <div className="pessoa">
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

                    <div className="login">
                      <label>Login: </label>
                      <input
                          type="text"
                          value={Login}
                          onChange={(e) => setLogin(e.target.value)}
                          placeholder="Digite o seu usuário"
                      />
                    </div>
                
                    <div className="login">
                      <label>Senha: </label>
                      <input
                          type="password"
                          value={Senha}
                          onChange={(e) => setSenha(e.target.value)}
                          placeholder="Digite a sua senha"
                      />
                    </div>
                
                <button type="submit">Entrar</button>
                

            </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
