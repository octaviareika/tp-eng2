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
        <Route path="/" element={<Login />} />
        <Route path="/ActivityForm" element={
              <div>
              { <Sidebar /> } 
              { <ActivityForm /> }
            </div>
        } />
    </Routes>

  </BrowserRouter>
);

export default App;