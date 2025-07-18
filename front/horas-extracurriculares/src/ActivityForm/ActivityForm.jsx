import React, { useState } from "react";
import uploadIcon from "../assets/logo-upload-removed.png";
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
        <div className="logo-ufop-div">
          <img className="logo-ufop" src={logoUfop} alt="Logo da UFOP" />
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
