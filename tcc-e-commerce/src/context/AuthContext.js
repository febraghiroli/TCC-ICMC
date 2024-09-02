// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Criação do contexto
const AuthContext = createContext();

// Provedor de autenticação para envolver a aplicação
export const AuthProvider = ({ children }) => {
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail')); // Recupera o email do localStorage

  useEffect(() => {
    // Atualiza o localStorage sempre que o userEmail mudar
    if (userEmail) {
      localStorage.setItem('userEmail', userEmail);
    } else {
      localStorage.removeItem('userEmail');
    }
  }, [userEmail]);

  const login = (email) => {
    setUserEmail(email); // Define o e-mail do usuário após o login
  };

  const logout = () => {
    setUserEmail(null); // Limpa o e-mail do usuário ao sair
    localStorage.removeItem('userEmail'); // Remove o email do localStorage ao sair
  };

  return (
    <AuthContext.Provider value={{ userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);
