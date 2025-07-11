import React, { useState, useEffect } from "react";

const PendingTask = () => {
    const [atividades, setAtividades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortOrder, setSortOrder] = useState("recentes");

    useEffect(() => {
        const fetchAtividades = async () => {
            try {
                const response = await fetch('http://localhost:3000/atividades/pendentes');
                const data = await response.json();
                setAtividades(data);
            } catch (error) {
                console.error("Erro ao buscar atividades:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchAtividades();
    }, []);

    const sortedActivities = [...atividades].sort((a, b) => {
        const dateA = new Date(a.dataInicio);
        const dateB = new Date(b.dataInicio);
        
        return sortOrder === "recentes" 
            ? dateB - dateA
            : dateA - dateB;
    });

    if (loading) {
        return <div className="content">Carregando...</div>;
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
                                <p>- Aluno: {atividade.aluno.nome} - {atividade.aluno.matricula}</p>
                                <p>- {atividade.categoria.nome}: {atividade.titulo}</p>
                                <p>
                                    {new Date(atividade.dataInicio).toLocaleDateString('pt-BR')}
                                    {atividade.dataFim && ` * ${new Date(atividade.dataFim).toLocaleDateString('pt-BR')}`}
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