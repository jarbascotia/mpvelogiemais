import React from 'react';
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import Banner from './components/BannerComponent';
import EstatisticasElogie from './pages/EstatisticasElogie';
import Footer from './components/Footer';
import ElogieLista from './pages/ElogieLista';
import ElogieGrafico from './pages/ElogieGrafico';
import Menu from './components/Menu';
import './styles.css'; // Importando o arquivo CSS
import SpeedDialAction from './components/Plus';
import Card from './components/Card';


function App() {
  return (
    <Router>
      <div className="App">
        <header>
          <Banner />
          <Menu />
          <SpeedDialAction />
          
         
        </header>
        <main>
          <Routes>
            <Route path="/" element={<EstatisticasElogie />} />
            <Route path="/elogios" element={<ElogieLista />} />
            <Route path="/grafico" element={<ElogieGrafico />} />
            
          </Routes>
          <Card />
        </main>
       
        <Footer />
      </div>
    </Router>
  );
}


export default App;
