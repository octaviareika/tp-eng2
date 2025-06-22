import React from "react";
import fotoPerfil from '../assets/icone-perfil.png';
import logoUfop from '../assets/logo-ufop.png';

const Sidebar = () => (
    <div className="sidebar">
        <div className="profile">
            <img className="size-icon" src={fotoPerfil} alt="Foto de perfil da UFOP" />

          <span className="my-profile">Meu Perfil</span>
        </div>
        <ul>
          <li className="list"><a href="#">Página Inicial</a></li>
          <li className="list"><a href="#">Buscar Atividade</a></li>
          <li className="list"><a href="#">Histórico Completo</a></li>
          <li className="list"><a href="#">Configurações</a></li>
        </ul>
        <div className="footer">
            <img className="logo-ufop" src={logoUfop} alt="Logo da UFOP" />
          <p className="alt-ufop">UFOP<br />Universidade Federal<br />de Ouro Preto</p>
        </div>
    </div>
);

export default Sidebar;