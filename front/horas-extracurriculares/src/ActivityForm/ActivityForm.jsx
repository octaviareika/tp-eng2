import React, { useState } from "react";
import uploadIcon from '../assets/logo-upload-removed.png';

const ActivityForm = () => {
  const [fileName, setFileName] = useState("");
  const [descricao, setDescricao] = useState("");
  const [titulo, setTitulo] = useState("");
  const [tipo, setTipo] = useState("");
  const [data, setData] = useState("");
  const [file, setFile] = useState(null);
  const [mensagem, setMensagem] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
    setFileName(file ? file.name : "");
  };

  const handleUploadClick = () => {
    document.getElementById('arquivo').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('titulo', titulo);
    formData.append("descricao", descricao);
    formData.append("horasSolicitadas", 1);
    formData.append("dataInicio", data);
    formData.append("dataSubmissao", data);
    formData.append("categoriaNome", tipo);
    formData.append("alunoMatricula", "123456"); // Exemplo de matrícula
    if (file) formData.append("documentoComprovanteUrl", file);

    try {
      const response = await fetch("http://localhost:8080/Atividade", {
        method: "POST",
        body: formData,
      });

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
      <h2>Registro de atividade</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <div>
          <label>Título da atividade:</label>
          <input type="text" value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Digite o nome da atividade" />
        </div>
        <div className="flex">
          <div>
            <label>Tipo de atividade:</label>
            <select value={tipo} onChange={e => setTipo(e.target.value)}>
              <option value="">Selecione</option>
              <option>Palestra</option>
              <option>Curso</option>
              <option>Workshop</option>
              <option>Voluntariado</option>
              <option>Outro</option>
            </select>
          </div>
          <div>
            <label>Data:</label>
            <input value={data} onChange={e => setData(e.target.value)} type="text" placeholder="Dia / Mês / Ano" />
          </div>
        </div>
        <div>
          <label>Descrição da Atividade:</label>
          <textarea value={descricao} onChange={e => setDescricao(e.target.value)}></textarea>
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
          />
        </div>
        <button type="submit">Adicionar Atividade</button>
        {mensagem && <p className="message">{mensagem}</p>}
      </form>
    </div>
  );
};

export default ActivityForm;