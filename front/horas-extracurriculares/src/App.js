import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './SideBar/Sidebar.jsx';
import SidebarFunc from './SideBar-Func/SideBarFunc.jsx';
import ActivityForm from './ActivityForm/ActivityForm.jsx';
import PendingTasks from './PendingTasks/PendingTasks.jsx';
import MainContent from './Activity-Student/ActivityStudent.jsx';
import './css/registro.css';

const App = () => {
  const [userType, setUserType] = useState(null);

  // A tela de seleção de usuário não precisa de roteamento
  if (!userType) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh',
        flexDirection: 'column',
        gap: '20px'
      }}>
        <h2>Modo de Teste</h2>
        <button onClick={() => setUserType('aluno')} style={{ padding: '10px 20px' }}>
          Entrar como Aluno
        </button>
        <button onClick={() => setUserType('professor')} style={{ padding: '10px 20px' }}>
          Entrar como Professor
        </button>
      </div>
    );
  }

  // Quando um usuário é selecionado, envolvemos a aplicação com BrowserRouter
  return (
    <BrowserRouter>
      <div className="app-container">
        <button 
          onClick={() => setUserType(null)} 
          style={{ position: 'absolute', top: '10px', left: '10px', padding: '5px 10px' }}
        >
          Voltar
        </button>
        {userType === 'aluno' ? (
          <>
            <Sidebar />
            <Routes>
              <Route path="/" element={<MainContent />} />
              <Route path="/registrar-atividade" element={<ActivityForm />} />
              {/* Outras rotas de aluno podem ser adicionadas aqui */}
            </Routes>
          </>
        ) : (
          <>
            <SidebarFunc />
            <Routes>
              <Route path="/" element={<PendingTasks />} />
              {/* Outras rotas de funcionário podem ser adicionadas aqui */}
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;