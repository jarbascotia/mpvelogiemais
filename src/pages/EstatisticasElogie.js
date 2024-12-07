import React, { useState, useEffect, useContext } from 'react';
import CarouselComponent from '../components/CarouselElogie';
import { Container } from 'react-bootstrap';
import { getUnifiedData } from '../utils/readData';
import PopupContext from '../context/PopupContext';
import { FaCrown, FaCalendarDay, FaPercentage, FaStar, FaChartPie } from 'react-icons/fa';
import './EstatisticasElogie.css'; // Importar o arquivo CSS para estilização

const EstatisticasElogie = () => {
  const { handlePopup, popupShownToday } = useContext(PopupContext);
  const [data, setData] = useState([]);
  const [totalElogios, setTotalElogios] = useState(0);
  const [elogiosDoDia, setElogiosDoDia] = useState(0);
  const [categoriaMaisElogiada, setCategoriaMaisElogiada] = useState('Nenhuma categoria elogiada ainda');
  const [categoriaMaisElogiadaHoje, setCategoriaMaisElogiadaHoje] = useState('Nenhuma categoria elogiada hoje');
  const [categoriaMaisElogiadaPercentual, setCategoriaMaisElogiadaPercentual] = useState('0');
  const [categoriaMaisElogiadaHojePercentual, setCategoriaMaisElogiadaHojePercentual] = useState('0');

  useEffect(() => {
    const fetchData = async () => {
      const unifiedData = await getUnifiedData();
      setData(unifiedData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const total = data.length;
    setTotalElogios(total);

    const elogiosHoje = data.filter(elogio => elogio.data === new Date().toISOString().slice(0, 10)).length;
    setElogiosDoDia(elogiosHoje);

    const categoriaCounts = data.reduce((acc, curr) => {
      acc[curr.categoria] = (acc[curr.categoria] || 0) + 1;
      return acc;
    }, {});

    const categoriaMais = Object.keys(categoriaCounts).reduce((a, b) => categoriaCounts[a] > categoriaCounts[b] ? a : b, '');
    const categoriaMaisPercentual = categoriaCounts[categoriaMais] ? ((categoriaCounts[categoriaMais] / total) * 100).toFixed(2) : '0';
    setCategoriaMaisElogiada(categoriaMais ? `${categoriaMais} (${categoriaCounts[categoriaMais]})` : 'Nenhum elogio');
    setCategoriaMaisElogiadaPercentual(categoriaMaisPercentual);

    const categoriaCountsHoje = data.filter(elogio => elogio.data === new Date().toISOString().slice(0, 10)).reduce((acc, curr) => {
      acc[curr.categoria] = (acc[curr.categoria] || 0) + 1;
      return acc;
    }, {});

    const categoriaMaisHoje = Object.keys(categoriaCountsHoje).reduce((a, b) => categoriaCountsHoje[a] > categoriaCountsHoje[b] ? a : b, '');
    const categoriaMaisHojePercentual = categoriaCountsHoje[categoriaMaisHoje] ? ((categoriaCountsHoje[categoriaMaisHoje] / elogiosHoje) * 100).toFixed(2) : '0';
    setCategoriaMaisElogiadaHoje(categoriaMaisHoje ? `${categoriaMaisHoje} (${categoriaCountsHoje[categoriaMaisHoje]})` : 'Nenhum elogio');
    setCategoriaMaisElogiadaHojePercentual(categoriaMaisHojePercentual);

    if (!popupShownToday) {
      for (const categoria in categoriaCountsHoje) {
        if (categoriaCountsHoje[categoria] === 3) {
          handlePopup(`A categoria "${categoria}" recebeu 3 elogios hoje!`);
          break;
        }
      }
    }
  }, [data, handlePopup, popupShownToday]);

  return (
    <Container style={{ width: '1000px', display: 'flex', margin: '20px auto' }}>
      <div style={{ flex: 1, marginRight: '10px' }}>
        <CarouselComponent />
      </div>
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'repeat(3, 1fr)', gap: '10px' }}>
        <div className="grid-item stats-box">
          <div className="icon-column">
            <FaCrown className="icon" />
          </div>
          <div className="text-column">
            <div className="label">Total elogios:</div>
            <div className="value">{totalElogios}</div>
          </div>
        </div>
        <div className="grid-item stats-box">
          <div className="icon-column">
            <FaCalendarDay className="icon" />
          </div>
          <div className="text-column">
            <div className="label">Total elogios dia:</div>
            <div className="value">{elogiosDoDia}</div>
          </div>
        </div>
        <div className="grid-item stats-box">
          <div className="icon-column">
            <FaStar className="icon" />
          </div>
          <div className="text-column">
            <div className="label">Categoria Top:</div>
            <div className="value">{categoriaMaisElogiada}</div>
          </div>
        </div>
        <div className="grid-item stats-box">
          <div className="icon-column">
            <FaPercentage className="icon" />
          </div>
          <div className="text-column">
            <div className="label">% Categoria Top:</div>
            <div className="value">{categoriaMaisElogiadaPercentual}%</div>
          </div>
        </div>
        <div className="grid-item stats-box">
          <div className="icon-column">
            <FaChartPie className="icon" />
          </div>
          <div className="text-column">
            <div className="label">Top de hoje:</div>
            <div className="value">{categoriaMaisElogiadaHoje}</div>
          </div>
        </div>
        <div className="grid-item stats-box">
          <div className="icon-column">
            <FaPercentage className="icon" />
          </div>
          <div className="text-column">
            <div className="label">% Top do dia:</div>
            <div className="value">{categoriaMaisElogiadaHojePercentual}%</div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default EstatisticasElogie;