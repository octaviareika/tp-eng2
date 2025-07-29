import React, { useState } from "react";
import uploadIcon from "../assets/logo-upload-removed.png";
import styles from "../css/registro.module.css";

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
    <div className={styles.activityFormContainer}>
      <div className={styles.content}>
        <h2>Registro de atividade</h2>
        <form className={styles.formContainer} onSubmit={handleSubmit}>
          <div>
            <label>Título da atividade:</label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Digite o nome da atividade"
            />
          </div>
          <div className={styles.flex}>
            <div>
              <label>Tipo de atividade:</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="">Selecione</option>
                <option>Palestra</option>
                <option>Curso</option>
                <option>Workshop</option>
                <option>Voluntariado</option>
                <option>Outro</option>
              </select>
            </div>
            <div className={styles.datas}>
              <label className={styles.textDataInicio}>Data início:</label>
              <input
                value={dataI}
                onChange={(e) => setDataI(e.target.value)}
                type="text"
                placeholder="Dia / Mês / Ano"
                className={styles.inputData}
              />

              <label className={styles.textDataFim}>Data fim:</label>
              <input
                value={dataF}
                onChange={(e) => setDataF(e.target.value)}
                type="text"
                placeholder="Dia / Mês / Ano"
                className={styles.inputData}
              />
            </div>
          </div>
          <div>
            <label>Descrição da Atividade:</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            ></textarea>
          </div>
          <div>
            <label>Anexar certificado/comprovante:</label>
            <div className={styles.upload} onClick={handleUploadClick}>
              <img className={styles.uploadIcon} src={uploadIcon} alt="Upload Icon" />
              <span className={styles.fileName}>{fileName}</span>
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
          {mensagem && <p className={styles.message}>{mensagem}</p>}
        </form>
      </div>
    </div>
  );
};

export default ActivityForm;