// BuyProducts.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BuyProducts.css';

const BuyProducts = () => {
  const [products, setProducts] = useState([]); // Estado para armazenar os produtos
  const [currentPage, setCurrentPage] = useState(1); // Estado para a página atual
  const [totalPages, setTotalPages] = useState(1); // Estado para o total de páginas
  const itemsPerPage = 10; // Número de itens por página

  useEffect(() => {
    // Função para buscar produtos do backend
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/items?page=${currentPage}&limit=${itemsPerPage}`);
        setProducts(response.data.items); // Defina os produtos retornados pela API
        setTotalPages(response.data.totalPages); // Defina o total de páginas
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, [currentPage]); // Atualiza quando a página atual muda

  // Função para mudar a página
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="buy-products-container">
      <h2>Comprar Produtos</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.s3_url} alt={product.product_name} className="product-image" />
            <h3>{product.product_name}</h3>
            <p>{product.price}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Próxima
        </button>
      </div>
    </div>
  );
};

export default BuyProducts;
