import React, { useState } from "react";
import uploadIcon from '../assets/logo-upload-removed.png';

const ActivityForm = () => {
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    } else {
      setFileName("");
    }
  };

  const handleUploadClick = () => {
    document.getElementById('arquivo').click();
  };

  return (
    <div className="content">
      <h2>Registro de atividade</h2>
      <div className="form-container">
        <div>
          <label>Título da atividade:</label>
          <input type="text" placeholder="Digite o nome da atividade" />
        </div>
        <div className="flex">
          <div>
            <label>Tipo de atividade:</label>
            <select>
              <option>Palestra</option>
              <option>Curso</option>
              <option>Workshop</option>
              <option>Voluntariado</option>
              <option>Outro</option>
            </select>
          </div>
          <div>
            <label>Data:</label>
            <input type="text" placeholder="Dia / Mês / Ano" />
          </div>
        </div>
        <div>
          <label>Descrição da Atividade:</label>
          <textarea></textarea>
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
            name="arquivo"
            onChange={handleFileChange}
          />
        </div>
        <button>Adicionar Atividade</button>
      </div>
    </div>
  );
};

export default ActivityForm;
