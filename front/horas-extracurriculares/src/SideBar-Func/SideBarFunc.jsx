import React from "react";
import logoUfop from '../assets/logo-ufop.png';

const SidebarFunc = () => (

    <div className="sidebar">
      <div className="painelAluno">Painel do Professor</div>
          <div className="profile">

            <span className="my-profile">Meu Perfil</span>
          </div>
          <ul>
            <li className="list"><a href="#">Atividades Pendentes</a></li>
            <li className="list"><a href="#">Histórico de Atividades</a></li>
            <li className="list"><a href="#">Configurações</a></li>
          </ul>
          <div className="footer">
              <img className="logo-ufop" src={logoUfop} alt="Logo da UFOP" />
          </div>
      
    </div>
);

export default SidebarFunc;