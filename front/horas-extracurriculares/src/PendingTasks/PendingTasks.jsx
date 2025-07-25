import React, { useState, useEffect } from "react";

const PendingTask = () => {
    const [atividades, setAtividades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState("recentes");

    useEffect(() => {
        const fetchAtividades = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/Funcionario/AtividadesPendentes", {
                    // credentials: 'include'
                });
    
            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Dados recebidos:", data);
            setAtividades(data);
        } catch (error) {
            console.error("Erro detalhado:", error);
            setError(error.message || "Erro ao buscar atividades");
        } finally {
            setLoading(false);
        }
        };

        fetchAtividades();
    }, []);

    const sortedActivities = [...atividades].sort((a, b) => {
        const dateA = new Date(a.dataSubmissao); // Note que no backend é ordenado por dataSubmissao
        const dateB = new Date(b.dataSubmissao);
        
        return sortOrder === "recentes" 
            ? dateB - dateA
            : dateA - dateB;
    });

    if (loading) {
        return <div className="content">Carregando...</div>;
    }

    if (error) {
        return <div className="content">Erro: {error}</div>;
    }

    return (
        <div className="content-container">
            <div className="title-sort-container">
                <h2 className="page-title">Atividades Pendentes</h2>
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
                                <p>- Aluno: {atividade.aluno?.nome} - {atividade.aluno?.matricula}</p>
                                <p>- {atividade.categoria?.nome}: {atividade.titulo}</p>
                                <p>
                                    Submetido em: {new Date(atividade.dataSubmissao).toLocaleDateString('pt-BR')}
                                    {atividade.dataInicio && ` | Período: ${new Date(atividade.dataInicio).toLocaleDateString('pt-BR')}`}
                                    {atividade.dataFim && ` a ${new Date(atividade.dataFim).toLocaleDateString('pt-BR')}`}
                                </p>
                            </div>
                            
                            <div className="divider"></div>
                            
                            <button className="visualizar-btn">
                                Visualizar
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="white-container">
                        <p>Não há atividades pendentes no momento.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PendingTask;