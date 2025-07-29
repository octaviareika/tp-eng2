import React, { useState, useEffect } from "react";

const PendingTask = () => {
    const [atividades, setAtividades] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sortOrder, setSortOrder] = useState("recentes");
    const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de busca

    useEffect(() => {
        const fetchAtividades = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/funcionario", {
                    credentials: 'include'
                });
    
                if (!response.ok) {
                    const errorData = await response.json().catch(() => null);
                    throw new Error(errorData?.message || `HTTP error! status: ${response.status}`);
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

    // Filtra atividades com base no termo de busca (aluno, matrícula ou título)
    const filteredActivities = atividades.filter((atividade) => {
        const searchLower = searchTerm.toLowerCase();
        return (
            atividade.aluno?.nome.toLowerCase().includes(searchLower) ||
            atividade.aluno?.matricula.toLowerCase().includes(searchLower) ||
            atividade.titulo.toLowerCase().includes(searchLower)
        );
    });

    // Ordena as atividades filtradas
    const sortedActivities = [...filteredActivities].sort((a, b) => {
        const dateA = new Date(a.dataSubmissao); 
        const dateB = new Date(b.dataSubmissao);
        return sortOrder === "recentes" ? dateB - dateA : dateA - dateB;
    });

    if (loading) return <div className="content">Carregando...</div>;
    if (error) return <div className="content">Erro: {error}</div>;

    return (
        <div className="content-container">
            <div className="title-sort-container">
                <div className="title-search-container">
                    <h2 className="page-title">Atividades Pendentes</h2>
                    {/* SearchBox integrada */}
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
                                <p>- Aluno: {atividade.aluno?.nome} - {atividade.aluno?.matricula}</p>
                                <p>- {atividade.categoria?.nome}: {atividade.titulo}</p>
                                <p>
                                    Submetido em: {new Date(atividade.dataSubmissao).toLocaleDateString('pt-BR')}
                                    {atividade.dataInicio && ` | Período: ${new Date(atividade.dataInicio).toLocaleDateString('pt-BR')}`}
                                    {atividade.dataFim && ` a ${new Date(atividade.dataFim).toLocaleDateString('pt-BR')}`}
                                </p>
                            </div>
                            <div className="divider"></div>
                            <button className="visualizar-btn">Visualizar</button>
                        </div>
                    ))
                ) : (
                    <div className="white-container">
                        <p>Nenhuma atividade encontrada.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PendingTask;