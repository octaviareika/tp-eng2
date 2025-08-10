import React from "react";
import fotoPerfil from '../assets/icone-perfil.png';
import logoUfop from '../assets/logo-ufop.png';
import { Link } from "react-router-dom";

const Sidebar = () => (

    <div className="sidebar">
      <div className="painelAluno">Painel do Aluno</div>
          <div className="profile">

              <img className="size-icon" src={fotoPerfil} alt="Foto de perfil da UFOP" />

            <span className="my-profile">Meu Perfil</span>
          </div>
          <ul>
            <li className="list"><Link to="/aluno">Página Inicial</Link></li>
            <li className="list"><Link to="/aluno/buscar-atividade">Buscar Atividade</Link></li>
            <li className="list"><Link to="/aluno/historico-completo">Histórico Completo</Link></li>
            <li className="list"><Link to="/aluno/registrar-atividade">Registrar atividade</Link></li>
          </ul>
          <div className="footer">
              <img className="logo-ufop" src={logoUfop} alt="Logo da UFOP" />
          </div>
      
    </div>
);

export default Sidebar;