import React, { useState, useEffect } from "react";
import "../css/activity.css";

const MainContent = () => {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fill, setFill] = React.useState(0);

  const META_HORAS = 360;

  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/aluno", {
          credentials: "include",
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
  }, []);

  // Função para calcular horas aprovadas
  const calcularHorasAprovadas = () => {
    return atividades
      .filter((atividade) => atividade.status.toLowerCase() === "aprovado")
      .reduce((total, atividade) => {
        const horas = parseInt(atividade.horasAprovadas) || 0;
        return total + horas;
      }, 0);
  };

  // Função para calcular porcentagem
  const calcularPorcentagem = () => {
    const horasAprovadas = calcularHorasAprovadas();
    const porcentagem = Math.min((horasAprovadas / META_HORAS) * 100, 100);
    return Math.round(porcentagem);
  };

  // Função para excluir atividade
  const handleDelete = async (atividadeId) => {
    if (window.confirm("Tem certeza que deseja excluir esta atividade?")) {
      try {
        const response = await fetch(
          `http://localhost:8080/api/atividade/${atividadeId}`,
          {
            method: "DELETE",
            credentials: "include",
          }
        );

        if (response.ok) {
          // Remove a atividade da lista local
          setAtividades(
            atividades.filter((atividade) => atividade.id !== atividadeId)
          );
          alert("Atividade excluída com sucesso!");
        } else {
          console.error("Erro ao excluir atividade");
          alert("Erro ao excluir atividade. Tente novamente.");
        }
      } catch (error) {
        console.error("Erro de conexão:", error);
        alert("Erro de conexão. Tente novamente.");
      }
    }
  };

  const horasAprovadas = calcularHorasAprovadas();
  const porcentagem = calcularPorcentagem();

  React.useEffect(() => {
    requestAnimationFrame(() => setFill(porcentagem));
  }, [porcentagem]);

  const barColor =
    porcentagem < 33 ? "#b22222" : porcentagem < 65 ? "#e6a700" : "#2e7d32";

  if (loading) {
    return (
      <div className="dashboard-content">
        <p>Carregando atividades...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-content">
      <h3>Atividades Extracurriculares completas:</h3>
      <div className="progressContainer">
        <div
          className="progressFill"
          style={{ width: `${fill}%`, backgroundColor: barColor }}
          aria-valuenow={porcentagem}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          {horasAprovadas}/{META_HORAS}h - {porcentagem}% Concluído
        </div>
      </div>

      <h3>Últimas atividades:</h3>
      {atividades.length > 0 ? (
        atividades.map((atividade) => (
          <div className="activity-card" key={atividade.id}>
            <div className="activity-header">
              <h4>
                {atividade.categoria.nome}: {atividade.titulo}
              </h4>
              <div className="activity-actions">
                <span className={`status ${atividade.status.toLowerCase()}`}>
                  {atividade.status}
                </span>
                {atividade.status.toLowerCase() === "pendente" && (
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(atividade.id)}
                    title="Excluir atividade"
                  >
                    Excluir
                  </button>
                )}
              </div>
            </div>
            <div className="activity-info">
              <span className="date">
                📅 {new Date(atividade.dataSubmissao).toLocaleDateString()}
              </span>
              <span className="hours">
                ⏰ {atividade.horasAprovadas || "N/A"}h
              </span>
            </div>
            {atividade.documentoComprovanteUrl && (
              <button className="certificate-btn">📄 Certificado</button>
            )}
          </div>
        ))
      ) : (
        <p>Nenhuma atividade registrada.</p>
      )}
    </div>
  );
};

export default MainContent;
