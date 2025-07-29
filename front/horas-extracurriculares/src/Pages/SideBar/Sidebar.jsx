import React from "react";
import fotoPerfil from '../assets/icone-perfil.png';
import logoUfop from '../assets/logo-ufop.png';
import styles from "../css/registro.module.css";

const Sidebar = () => (
  <div className={styles.activityFormContainer}>
    <div className={styles.sidebar}>
      <div className={styles.painelAluno}>Painel do Aluno</div>
      <div className={styles.profile}>
        <img className={styles.sizeIcon} src={fotoPerfil} alt="Foto de perfil da UFOP" />
        <span className={styles.myProfile}>Meu Perfil</span>
      </div>
      <ul>
        <li className={styles.list}><a href="#">Página Inicial</a></li>
        <li className={styles.list}><a href="#">Buscar Atividade</a></li>
        <li className={styles.list}><a href="#">Histórico Completo</a></li>
        <li className={styles.list}><a href="#">Configurações</a></li>
      </ul>
      <div className={styles.footer}>
        <img className={styles.logoUfop} src={logoUfop} alt="Logo da UFOP" />
      </div>
    </div>
  </div>
);

export default Sidebar;

