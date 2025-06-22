import React from "react";

const Sidebar = () => (
    <div className="sidebar">
        <div className="profile">
          <div></div>
          <span>Meu Perfil</span>
        </div>
        <ul>
          <li><a href="#">Página Inicial</a></li>
          <li><a href="#">Buscar Atividade</a></li>
          <li><a href="#">Histórico Completo</a></li>
          <li><a href="#">Configurações</a></li>
        </ul>
        <div className="footer">
          <img src="./../public/assets/fotoPerfilUfop.png" alt="Foto de perfil da UFOP" />
          <p>UFOP<br />Universidade Federal<br />de Ouro Preto</p>
        </div>
    </div>
);