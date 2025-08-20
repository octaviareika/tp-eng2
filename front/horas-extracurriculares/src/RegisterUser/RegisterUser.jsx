import React, { useState } from "react";
// 1. Importe o 'useNavigate' junto com o 'Link'
import { useNavigate } from "react-router-dom";
import logoUfop from "../assets/logo-ufop.png";
import styles from "../css/login.module.css";

const RegisterUser = () => {
  // Convenção: nomes de variáveis e estados começam com letra minúscula
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [tipoPessoa, setTipoPessoa] = useState("aluno");
  const [matricula, setMatricula] = useState("");
  const [curso, setCurso] = useState("");
  const [cargo, setCargo] = useState("");
  // Estado para armazenar a mensagem de erro
  const [erro, setErro] = useState("");

  // 2. Inicialize o hook useNavigate
  const navigate = useNavigate();

  // 3. Crie a função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();

    let body = {
      nome,
      email,
      senha,
      tipo: tipoPessoa,
    };

    if (!tipoPessoa) {
      setErro("Tipo de pessoa indefinido");
      return;
    }

    if (tipoPessoa === "aluno") {
      if (!nome || !email || !senha || !tipoPessoa || !curso || !matricula) {
        setErro("Por favor, preencha todos os campos.");
        return;
      } else {
        body.matricula = matricula;
        body.curso = curso;
      }
    }

    if (tipoPessoa === "funcionario") {
      if (!nome || !email || !senha || !tipoPessoa || !cargo) {
        setErro("Por favor, preencha todos os campos.");
        return;
      } else {
        body.cargo = cargo;
      }
    }

    setErro("");

    try {
      // Faz a chamada POST usando fetch para a sua API de registro
      if (tipoPessoa === "aluno") {
      }
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha no cadastro");
      }

      const data = await response.json();

      // Armazena o token e o tipo de usuário no localStorage
      //   localStorage.setItem("token", data.token);
      //   localStorage.setItem("userType", tipoPessoa);
      console.log("Cadastro realizado com sucesso!");

      navigate("/"); // Navega para a tela de login
    } catch (error) {
      setErro(error.message);
      console.error("Erro no cadastro:", error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.content}>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div className={styles.leftDiv}>
            <img
              className={styles.logoUfop}
              src={logoUfop}
              alt="Logo da UFOP"
            />
            {erro && <p className={styles.mensagemErro}>{erro}</p>}
          </div>

          <div className={styles.rightDiv}>
            <div className={styles.textBlock}>
              <h3>Bem-Vindo ao Portal de Atividades Extracurriculares UFOP</h3>
              <h4>
                Controle suas horas extracurriculares de forma simplificada
              </h4>
              <h5>Crie sua conta</h5>
            </div>

            <div className={styles.inputs}>
              <div className={styles.pessoa}>
                <div>
                  <label>Aluno</label>
                  <input
                    type="radio"
                    className={styles["custom-radio"]}
                    name="pessoa"
                    value="aluno"
                    checked={tipoPessoa === "aluno"}
                    onChange={(e) => setTipoPessoa(e.target.value)}
                  />
                </div>
                <div>
                  <label>Funcionário</label>
                  <input
                    type="radio"
                    className={styles["custom-radio"]}
                    name="pessoa"
                    value="funcionario"
                    checked={tipoPessoa === "funcionario"}
                    onChange={(e) => setTipoPessoa(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.inlineInputs}>
                <div className={styles.login}>
                  <label>Nome: </label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Digite o seu nome"
                  />
                </div>

                <div className={styles.login}>
                  <label>Matrícula: </label>
                  <input
                    type="text"
                    value={matricula}
                    onChange={(e) => setMatricula(e.target.value)}
                    placeholder="Digite a sua matrícula"
                    disabled={tipoPessoa !== "aluno"}
                  />
                </div>
              </div>
              <div className={styles.login}>
                <label>Email: </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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

              {tipoPessoa === "aluno" ? (
                <div className={styles.login}>
                  <label>Curso: </label>
                  <form action="#">
                    <select
                      name="cursos"
                      id="cursos"
                      value={curso}
                      onChange={(e) => {
                        setCurso(e.target.value);
                        console.log(e.target.value);
                      }}
                    >
                      <option value="biologia">Biologia</option>
                      <option value="ciência da computacao">
                        Ciência da Computação
                      </option>
                      <option value="direito">Direito</option>
                      <option value="engenharia civil">Engenharia Civil</option>
                      <option value="engenharia urbana">
                        Engenharia Urbana
                      </option>
                      <option value="física">Física</option>
                      <option value="matemática">Matemática</option>
                      <option value="medicina">Medicina</option>
                    </select>
                  </form>
                </div>
              ) : (
                <div className={styles.login}>
                  <label>Cargo: </label>
                  <form action="#">
                    <select
                      name="cargos"
                      id="cargos"
                      value={cargo}
                      onChange={(e) => setCargo(e.target.value)}
                    >
                      <option value="professor">Professor</option>
                      <option value="técnico">Técnico</option>
                      <option value="diretor">Diretor</option>
                      <option value="secretario">Secretário</option>
                    </select>
                  </form>
                </div>
              )}

              <div>
                <button type="submit" className={styles.botaoCC}>
                  Cadastrar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;
