import React, { useState, useEffect } from 'react';
import './MainContent.css';

const MainContent = () => {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/atividades/aluno', {
          credentials: 'include', // Essencial para enviar o cookie de sessão
        });
        if (response.ok) {
          const data = await response.json();
          setAtividades(data);
        } else {
          console.error("Erro ao buscar atividades");
        }
      } catch (error) {
        console.error("Erro de conexão:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAtividades();
  }, []); // O array vazio faz com que o useEffect rode apenas uma vez

  if (loading) {
    return <div className="main-content"><p>Carregando atividades...</p></div>;
  }

  return (
    <div className="main-content">
      <h3>Atividades Extracurriculares completas:</h3>
      <div className="progress-bar">
        <div className="progress" style={{ width: '60%' }}>216/360h - 60% Concluído</div>
      </div>
      <h3>Últimas atividades:</h3>
      {atividades.length > 0 ? (
        atividades.map(atividade => (
          <div className="activity-card" key={atividade.id}>
            <p>
              {atividade.categoria.nome}: {atividade.titulo}<br />
              {new Date(atividade.dataSubmissao).toLocaleDateString()} * {atividade.horasAprovadas || 'N/A'}h * 
              <span className={atividade.status.toLowerCase()}>{atividade.status}</span>
            </p>
            {atividade.documentoComprovanteUrl && <button>Certificado</button>}
          </div>
        ))
      ) : (
        <p>Nenhuma atividade registrada.</p>
      )}
    </div>
  );
};

export default MainContent;