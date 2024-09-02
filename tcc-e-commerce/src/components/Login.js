// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Importe o contexto de autenticação
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Use o método de login do contexto

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', {
        email: email,
        password: password,
      });

      setMessage('Login bem-sucedido!');
      console.log('Resposta do servidor:', response.data);

      login(email); // Chama o método de login do contexto para definir o email do usuário
      navigate('/home'); // Redireciona para a tela inicial após login
    } catch (error) {
      console.error('Erro ao realizar login:', error.response ? error.response.data : error.message);
      setMessage('Erro ao realizar login.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {message && <p>{message}</p>}
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="submit">Entrar</button>
          <button type="button" onClick={() => navigate('/register')}>
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
