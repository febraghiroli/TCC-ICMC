// Home.js
import React, { useState } from 'react';
import './Home.css'; // Estilo para o componente

const Home = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar o menu dropdown

  // Função para alternar o menu dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="home-container">
      <div className="navbar">
        <div className="hamburger-menu" onClick={toggleDropdown}>
          &#9776; {/* Ícone de hambúrguer */}
        </div>
        <div className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
          <a href="/comprar">Comprar Produtos</a>
          <a href="/vender">Anunciar Produto</a>
        </div>
      </div>
      {/* Conteúdo principal da tela inicial */}
      <div className="main-content">
        <h1>Bem-vindo à Plataforma</h1>
        <p>Escolha uma opção no menu para começar.</p>
      </div>
    </div>
  );
};

export default Home;
