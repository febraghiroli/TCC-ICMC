// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Importe o AuthProvider
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import SellProduct from './components/SellProduct';
import BuyProducts from './components/BuyProducts'; // Importe o componente BuyProducts
import GenerateReport from './components/GenerateReport'; // Importa o componente da nova rota

function App() {
  return (
    <AuthProvider> {/* Envolva o aplicativo com o AuthProvider */}
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
            <Route path="/vender" element={<SellProduct />} />
            <Route path="/comprar" element={<BuyProducts />} /> {/* Nova rota para comprar produtos */}
            <Route path="/gerar-relatorio" element={<GenerateReport />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
