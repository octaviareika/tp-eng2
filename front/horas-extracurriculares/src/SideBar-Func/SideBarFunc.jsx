import React from "react";
import fotoPerfil from '../assets/icone-perfil.png';
import logoUfop from '../assets/logo-ufop.png';
import { Link } from "react-router-dom";

const SidebarFunc = () => (
  <div className="sidebar">
    <div className="painelAluno">Painel do Professor</div>
    <div className="profile">
      <img className="size-icon" src={fotoPerfil} alt="Foto de perfil da UFOP" />
      <span className="my-profile">Meu Perfil</span>
    </div>
    <ul>
      <li className="list"><Link to="/funcionario">Atividades Pendentes</Link></li>
      <li className="list"><Link to="/funcionario/buscar-atividade">Buscar Atividade</Link></li>
      <li className="list"><Link to="/funcionario/historico-atividades">Histórico de Atividades</Link></li>
      <li className="list"><Link to="/funcionario/configuracoes">Configurações</Link></li>
    </ul>
    <div className="footer">
      <img className="logo-ufop" src={logoUfop} alt="Logo da UFOP" />
    </div>
  </div>
);

export default SidebarFunc;
