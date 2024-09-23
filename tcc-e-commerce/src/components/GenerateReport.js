import React, { useState } from 'react';
import './GenerateReport.css';

const GenerateReport = () => {
  const [email, setEmail] = useState(''); // Estado para armazenar o e-mail

  // Função para atualizar o estado do e-mail
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // Função para enviar o e-mail e gerar o relatório
  const handleGenerateReport = async () => {
    if (!email) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }), // Envia o e-mail no corpo do POST
      });

      if (response.ok) {
        alert('Relatório gerado e enviado por e-mail com sucesso!');
      } else {
        alert('Erro ao gerar o relatório.');
      }
    } catch (error) {
      console.error('Erro ao gerar o relatório:', error);
      alert('Erro ao gerar o relatório.');
    }
  };

  return (
    <div className="generate-report-container">
      <h1>Gerar Relatório de Produtos Anunciados</h1>
      <input
        type="email"
        placeholder="Digite seu e-mail"
        value={email}
        onChange={handleEmailChange}
      />
      <button onClick={handleGenerateReport}>Gerar Relatório</button>
    </div>
  );
};

export default GenerateReport;
