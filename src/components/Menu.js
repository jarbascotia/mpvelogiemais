import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaList, FaChartBar } from 'react-icons/fa';
import './Menu.css'; // Importar o arquivo CSS para estilização

const Menu = () => {
  return (
    <div className="menu-container">
      <Link to="/" className="menu-item" alt='Home'>
        <FaHome size={30} />
    
      </Link>
      <Link to="/elogios" className="menu-item">
        <FaList size={30} />
    
      </Link>
      <Link to="/grafico" className="menu-item">
        <FaChartBar size={30} />
   
      </Link>
    </div>
  );
};

export default Menu;
