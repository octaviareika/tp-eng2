import React, { useState } from "react";
import logoUfop from '../assets/logo-ufop.png';

const ActivityForm = () => {
  const [fileName, setFileName] = useState("");
  const [descricao, setDescricao] = useState("");
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [dataI, setDataI] = useState("");
  const [dataF, setDataF] = useState("");
  const [file, setFile] = useState(null);
  const [mensagem, setMensagem] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setFileName(file ? file.name : "");
  };

  const handleUploadClick = () => {
    document.getElementById("arquivo").click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Se você ainda precisar enviar o arquivo, terá que usar FormData
    // Mas se for apenas metadados sobre o arquivo (como URL), pode usar JSON
    const atividadeData = {
      titulo,
      descricao,
      dataInicio: dataI,
      dataFim: dataF,
      categoriaNome: tipo,
      alunoMatricula: "19.1.2021", // Exemplo de matrícula
      documentoComprovanteUrl: file ? file.name : "", // Aqui você pode ajustar conforme sua API espera
    };

    try {
      const response = await fetch("http://localhost:8080/Atividade", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(atividadeData),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setMensagem("Atividade adicionada com sucesso!");
      } else {
        setMensagem("Erro ao adicionar atividade.");
      }
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (

    <div className="content">
      <form className="form-container" onSubmit={handleSubmit}>
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
                

                
                    <label>Login: </label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Digite o seu usuário"
                    />
                
                


                    <label>Senha: </label>
                    <input
                        type="text"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder="Digite a sua senha"
                    />

               
                
                <button type="submit">Adicionar Atividade</button>
                

            </div>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
