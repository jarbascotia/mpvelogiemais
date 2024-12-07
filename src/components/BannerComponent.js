import React from 'react';
import './BannerElogie.css'; // Importar o CSS para estilização
import bannerImage from '../assets/logo.svg'; // Caminho da sua imagem

const BannerComponent = () => {
  return (
    <div className="banner-container">
      <img src={bannerImage} alt="Banner" className="banner-image" />
    </div>
  );
};

export default BannerComponent;