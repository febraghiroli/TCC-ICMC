import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'; // Estilo para o componente

const Home = () => {
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar o menu dropdown
  const navigate = useNavigate(); // Hook para navegação

  // Função para alternar o menu dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Função para redirecionar para a rota /gerar-relatorio
  const handleGenerateReportClick = () => {
    navigate('/gerar-relatorio'); // Redireciona para a nova rota
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
          {/* Novo botão para gerar o relatório redireciona para /gerar-relatorio */}
          <button onClick={handleGenerateReportClick}>Gerar Relatório de Produtos Anunciados</button>
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
