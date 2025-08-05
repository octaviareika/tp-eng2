import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './SideBar/Sidebar.jsx';
import SidebarFunc from './SideBar-Func/SideBarFunc.jsx';
import ActivityForm from './ActivityForm/ActivityForm.jsx';
import PendingTasks from './PendingTasks/PendingTasks.jsx';
import MainContent from './Activity-Student/ActivityStudent.jsx';
import './css/registro.css';
import Login from './Login/Login.jsx'

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* Rota inicial para a página de login */}
      <Route path="/" element={<Login />} />
      
      {/* Rotas específicas para alunos */}
      <Route 
        path="/aluno/*" 
        element={
          <>
            <Sidebar />
            <Routes>
              {/* Página inicial do aluno */}
              <Route path="/" element={<MainContent />} />
              <Route path="registrar-atividade" element={<ActivityForm />} />
            </Routes>
          </>
        } 
      />
      
      {/* Rotas específicas para funcionários */}
      <Route 
        path="/funcionario/*" 
        element={
          <>
            <SidebarFunc />
            <Routes>
              {/* Página inicial do funcionário */}
              <Route path="/" element={<PendingTasks />} />
              {/* Adicione outras rotas de funcionário aqui, se precisar */}
            </Routes>
          </>
        } 
      />
      
    </Routes>
  </BrowserRouter>
);

export default App;