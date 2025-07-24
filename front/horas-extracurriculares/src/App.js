import React, { useState } from 'react';
import Sidebar from './SideBar/Sidebar.jsx';
import SidebarFunc from './SideBar-Func/SideBarFunc.jsx'; // Sidebar do professor
import ActivityForm from './ActivityForm/ActivityForm.jsx';
import PendingTasks from './PendingTasks/PendingTasks.jsx'; // Página do professor
import "./css/registro.css";

const App = () => {
  const [userType, setUserType] = useState(null); // 'aluno', 'professor' ou null

  // Se não houver usuário selecionado, mostre os botões de teste
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

  // Renderização condicional com base no tipo de usuário
  return (
    <div>
      {/* Botão para voltar ao seletor (opcional) */}
      <button 
        onClick={() => setUserType(null)} 
        style={{ position: 'absolute', top: '10px', left: '10px', padding: '5px 10px' }}
      >
        Voltar
      </button>

      {userType === 'aluno' ? (
        <>
          <Sidebar />
          <ActivityForm />
        </>
      ) : (
        <>
          <SidebarFunc />
          <PendingTasks />
        </>
      )}
    </div>
  );
};

export default App;
