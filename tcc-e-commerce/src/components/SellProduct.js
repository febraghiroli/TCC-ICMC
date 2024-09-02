// SellProduct.js
import React, { useState } from 'react';
import axios from 'axios';
import AWS from 'aws-sdk';
import { useAuth } from '../context/AuthContext'; // Importe o contexto de autenticação
import { useNavigate } from 'react-router-dom'; // Importe o hook useNavigate
import './SellProduct.css';

const SellProduct = () => {
  const [productName, setProductName] = useState('');
  const [productType, setProductType] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); // Estado de loading
  const { userEmail } = useAuth(); // Use o email do usuário do contexto
  const navigate = useNavigate(); // Hook para navegação

  // Verificação do email do usuário
  if (!userEmail) {
    return <div>Você precisa estar logado para vender produtos.</div>;
  }

  // Configurar AWS S3 para LocalStack
  const s3 = new AWS.S3({
    accessKeyId: 'test', // Credenciais fictícias para o LocalStack
    secretAccessKey: 'test',
    endpoint: 'http://localhost:4566', // Endpoint do LocalStack
    s3ForcePathStyle: true, // Necessário para o LocalStack
  });

  // Função para lidar com o upload de imagem
  const handleImageUpload = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Função para formatar o preço como BRL
  const handlePriceChange = (e) => {
    const value = e.target.value.replace(/\D/g, ''); // Remove todos os caracteres que não sejam dígitos
    const formattedValue = (Number(value) / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
    setPrice(formattedValue);
  };

  // Função para enviar o formulário de venda
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      setMessage('Por favor, faça o upload de uma imagem.');
      return;
    }

    try {
      // Cria um nome único para a imagem usando o timestamp
      const fileName = `${Date.now()}_${imageFile.name}`;
      const params = {
        Bucket: 'meu-bucket', // Nome do bucket no LocalStack
        Key: fileName,
        Body: imageFile,
        ContentType: imageFile.type,
      };

      // Faz o upload da imagem para o S3 no LocalStack
      const uploadResult = await s3.upload(params).promise();
      const s3Url = uploadResult.Location; // URL da imagem no S3

      // Envia os dados do produto para o backend
      const response = await axios.post('http://localhost:8000/item', {
        user_email: userEmail, // Usa o email do usuário do contexto
        product_name: productName,
        s3_url: s3Url,
        product_type: productType,
        price: price.replace('R$', '').trim(),
        description: description,
      });

      setMessage('Produto anunciado com sucesso!');
      console.log('Resposta do backend:', response.data);

      // Exibir o loading por 2 segundos e depois redirecionar para Home
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate('/home'); // Redireciona para a página inicial (Home)
      }, 2000);
    } catch (error) {
      console.error('Erro ao anunciar o produto:', error);
      setMessage('Erro ao anunciar o produto.');
    }
  };

  return (
    <div className="sell-product-container">
      <h2>Vender Produto</h2>
      {message && <p>{message}</p>}
      {loading ? ( // Exibe o loading se estiver carregando
        <div className="loading">Carregando...</div>
      ) : (
        <form className="sell-product-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="productName">Nome do Produto:</label>
            <input
              type="text"
              id="productName"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="productType">Tipo do Produto:</label>
            <input
              type="text"
              id="productType"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="price">Preço:</label>
            <input
              type="text"
              id="price"
              value={price}
              onChange={handlePriceChange}
              placeholder="R$ 0,00"
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="imageUpload">Imagem do Produto:</label>
            <input type="file" id="imageUpload" onChange={handleImageUpload} required />
          </div>
          <button type="submit">Anunciar Produto</button>
        </form>
      )}
    </div>
  );
};

export default SellProduct;
