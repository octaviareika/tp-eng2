import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from './SideBar/Sidebar.jsx';
import SidebarFunc from './SideBar-Func/SideBarFunc.jsx';
import ActivityForm from './ActivityForm/ActivityForm.jsx';
import PendingTasks from './PendingTasks/PendingTasks.jsx';
import MainContent from './Activity-Student/ActivityStudent.jsx';
import './css/registro.css';
import Login from './Login/Login.jsx';

// ✅ Layouts com Outlet
const AlunoLayout = () => (
  <div className="app-container">
    <Sidebar />
    <div className="main-content">
      <Outlet />
    </div>
  </div>
);

const FuncionarioLayout = () => (
  <div className="app-container">
    <SidebarFunc />
    <div className="main-content">
      <Outlet />
    </div>
  </div>
);

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login />} />
      
      {/* Rotas do aluno */}
      <Route path="/aluno" element={<AlunoLayout />}>
        <Route index element={<MainContent />} />
        <Route path="registrar-atividade" element={<ActivityForm />} />
      </Route>

      {/* Rotas do funcionário */}
      <Route path="/funcionario" element={<FuncionarioLayout />}>
        <Route index element={<PendingTasks />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;
