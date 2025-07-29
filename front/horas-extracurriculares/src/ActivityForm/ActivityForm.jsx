import React, { useState } from "react";
import uploadIcon from "../assets/logo-upload-removed.png";

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

    const formData = new FormData();

    formData.append("titulo", titulo);
    formData.append("descricao", descricao);
    formData.append("dataInicio", dataI);
    formData.append("dataFim", dataF); 
    formData.append("categoriaNome", tipo);  

    if (file) {
      formData.append("documentoComprovanteUrl", file);
    }

    try {
      const response = await fetch("http://localhost:8080/api/atividade", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setMensagem("Atividade adicionada com sucesso!");
        setTitulo("");
        setDescricao("");
        setTipo("");
        setDataI("");
        setDataF("");
        setFile(null);
        setFileName("");
      } else {
        setMensagem("Erro ao adicionar atividade.");
      }
    } catch (error) {
      setMensagem("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="content">
      <h2>Registro de atividade</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label>Título da atividade:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Digite o nome da atividade"
            required
          />
        </div>
        <div className="flex">
          <div>
            <label>Tipo de atividade:</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
              <option value="">Selecione</option>
              <option>Palestra</option>
              <option>Curso</option>
              <option>Workshop</option>
              <option>Voluntariado</option>
              <option>Outro</option>
            </select>
          </div>
          <div className="datas">
            <label className="textDataInicio">Data início:</label>
            <input
              value={dataI}
              onChange={(e) => setDataI(e.target.value)}
              type="date" 
              placeholder="Dia / Mês / Ano"
              className="input-data"
              required
            />

            <label className="textDataFim">Data fim:</label>
            <input
              value={dataF}
              onChange={(e) => setDataF(e.target.value)}
              type="date" 
              placeholder="Dia / Mês / Ano"
              className="input-data"
              required
            />
          </div>
        </div>
        <div>
          <label>Descrição da Atividade:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Anexar certificado/comprovante:</label>
          <div className="upload" onClick={handleUploadClick}>
            <img className="upload-icon" src={uploadIcon} alt="Upload Icon" />
            <span className="file-name">{fileName}</span>
          </div>
          <input
            type="file"
            id="arquivo"
            name="documentoComprovanteUrl"
            style={{ display: "none" }}
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit">Adicionar Atividade</button>
        {mensagem && <p className="message">{mensagem}</p>}
      </form>
    </div>
  );
};

export default ActivityForm;
