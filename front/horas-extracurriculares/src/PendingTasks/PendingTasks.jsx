import React, { useState, useEffect } from "react";
import "../css/pendingTasks.css";
const PendingTask = () => {
  const [atividades, setAtividades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortOrder, setSortOrder] = useState("recentes");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [approvedHours, setApprovedHours] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/funcionario", {
          credentials: "include",
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);
          throw new Error(
            errorData?.message || `HTTP error! status: ${response.status}`
          );
        }

        const data = await response.json();
        setAtividades(data);
      } catch (error) {
        setError(error.message || "Erro ao buscar atividades");
      } finally {
        setLoading(false);
      }
    };

    fetchAtividades();
  }, []);

  const filteredActivities = atividades.filter((atividade) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      atividade.aluno?.nome.toLowerCase().includes(searchLower) ||
      atividade.aluno?.matricula.toLowerCase().includes(searchLower) ||
      atividade.titulo.toLowerCase().includes(searchLower)
    );
  });

  const sortedActivities = [...filteredActivities].sort((a, b) => {
    const dateA = new Date(a.dataSubmissao);
    const dateB = new Date(b.dataSubmissao);
    return sortOrder === "recentes" ? dateB - dateA : dateA - dateB;
  });

  const [action, setAction] = useState(null);

  const handleConfirm = async (status) => {
    if (!selectedActivity) return;

    const body = {
      status,
      horasAprovadas: status === "Aprovado" ? parseFloat(approvedHours) : 0,
      comentario: comment,
    };

    try {
      const response = await fetch(
        `http://localhost:8080/api/funcionario/atividade/${selectedActivity.id}/status`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
          credentials: "include",
        }
      );
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `HTTP error! status: ${response.status}`
        );
      }

      setAtividades((prevAtividades) =>
        prevAtividades.filter(
          (atividade) => atividade.id !== selectedActivity.id
        )
      );

      setSelectedActivity(null);
      setApprovedHours("");

      alert("Status da atividade atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o status:", error);
      alert("Erro ao atualizar o status da atividade. " + error.message);
    }
  };

  const handleDownload = async (filename, titulo) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/download/${filename}`,
        {
          credentials: "include",
        }
      );

      if (response.ok) {
        // Converte a resposta em blob
        const blob = await response.blob();

        // Cria um URL temporário para o blob
        const url = window.URL.createObjectURL(blob);

        // Cria um link temporário e clica nele para fazer download
        const link = document.createElement("a");
        link.href = url;
        link.download = `certificado_${titulo}_${filename}`; // Nome do arquivo
        document.body.appendChild(link);
        link.click();

        // Limpa o link e URL temporários
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } else {
        console.error("Erro no download:", response.status);
        alert("Erro ao baixar o arquivo. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro de conexão no download:", error);
      alert("Erro de conexão. Tente novamente.");
    }
  };

  if (loading) return <div className="content">Carregando...</div>;
  if (error) return <div className="content">Erro: {error}</div>;

  return (
    <div
      className={`content-container ${
        selectedActivity && "centered-container"
      }`}
    >
      {!selectedActivity ? (
        // Tela de lista de atividades
        <>
          <div className="title-sort-container">
            <div className="title-search-container">
              <h2 className="page-title">Atividades Pendentes</h2>
              <div className="search-box">
                <input
                  type="text"
                  placeholder="Buscar atividade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
            </div>

            <div className="sort-options">
              <span className="sort-label">Ordenar:</span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="sort-select"
              >
                <option value="recentes">Mais recentes</option>
                <option value="antigas">Mais antigas</option>
              </select>
            </div>
          </div>

          <div className="gray-container">
            {sortedActivities.length > 0 ? (
              sortedActivities.map((atividade) => (
                <div key={atividade.id} className="white-container">
                  <div className="atividade-info">
                    <p>
                      {" "}
                      Aluno: {atividade.aluno?.nome} -{" "}
                      {atividade.aluno?.matricula}
                    </p>
                    <p>
                      {" "}
                      {atividade.categoria?.nome}: {atividade.titulo}
                    </p>
                    <p>
                      Submetido em:{" "}
                      {new Date(atividade.dataSubmissao).toLocaleDateString(
                        "pt-BR"
                      )}
                      {atividade.dataInicio &&
                        ` | Período: ${new Date(
                          atividade.dataInicio
                        ).toLocaleDateString("pt-BR")}`}
                      {atividade.dataFim &&
                        ` a ${new Date(atividade.dataFim).toLocaleDateString(
                          "pt-BR"
                        )}`}
                    </p>
                  </div>
                  <div className="divider"></div>
                  <div className="actions-container">
                    <button
                      className="visualizar-btn"
                      onClick={() => setSelectedActivity(atividade)}
                    >
                      Visualizar
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="white-container">
                <p>Nenhuma atividade encontrada.</p>
              </div>
            )}
          </div>
        </>
      ) : action === null ? (
        // Tela de detalhes
        <div className="details-container">
          <h2>Detalhes da Atividade</h2>
          <p>
            Informações do Aluno: {selectedActivity.aluno?.nome} -{" "}
            {selectedActivity.aluno?.matricula}
          </p>
          <p>
            Informações da Atividade: {selectedActivity.categoria?.nome} -{" "}
            {selectedActivity.titulo}
          </p>
          <p>
            Data Início:{" "}
            {selectedActivity.dataInicio
              ? new Date(selectedActivity.dataInicio).toLocaleDateString(
                  "pt-BR"
                )
              : "N/A"}
            {selectedActivity.dataFim && (
              <span className="date-separator">
                Data Fim:{" "}
                {new Date(selectedActivity.dataFim).toLocaleDateString("pt-BR")}
              </span>
            )}
          </p>
          <p>
            Descrição da Atividade:{" "}
            {selectedActivity.descricao
              ? selectedActivity.descricao
              : "Não disponível"}
          </p>

          <div className="certificate-section">
            <p>Comprovante/Certificado:</p>
            {selectedActivity.documentoComprovanteUrl ? (
              <div className="certificate-actions">
                <button
                  className="download-btn"
                  onClick={() =>
                    handleDownload(
                      selectedActivity.documentoComprovanteUrl,
                      selectedActivity.titulo
                    )
                  }
                >
                  📥 Baixar arquivo
                </button>
              </div>
            ) : (
              <p>Nenhum arquivo enviado</p>
            )}
          </div>

          <div className="details-actions">
            <button
              className="reject-btn"
              onClick={() => setAction("reprovar")}
            >
              Reprovar
            </button>
            <button
              className="approve-btn"
              onClick={() => setAction("aprovar")}
            >
              Aprovar
            </button>
          </div>

          <button
            className="back-btn"
            onClick={() => setSelectedActivity(null)}
          >
            Voltar
          </button>
        </div>
      ) : action === "aprovar" ? (
        // Tela de aprovar
        <div className="approve-form">
          <div class="form-row">
            <label>Horas da atividade:</label>
            <input
              type="number"
              value={approvedHours}
              onChange={(e) => setApprovedHours(e.target.value)}
            />
          </div>

          <label>Observação:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="button-group">
            <button onClick={() => setAction(null)}>Retornar</button>
            <button
              onClick={() => {
                handleConfirm("Aprovado");
                setAction(null);
              }}
            >
              Aprovar
            </button>
          </div>
        </div>
      ) : (
        // Tela de reprovar
        <div className="reject-form">
          <label>Justificativa:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="button-group">
            <button onClick={() => setAction(null)}>Retornar</button>
            <button
              onClick={() => {
                handleConfirm("Rejeitado");
                setAction(null);
              }}
            >
              Reprovar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingTask;
