import React, { useState, useContext, useEffect } from 'react';
import { getUnifiedData } from '../utils/readData';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Container, Row, Col, Form } from 'react-bootstrap';
import PopupContext from '../context/PopupContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ElogieGrafico = () => {
  const { handlePopup, popupShownToday } = useContext(PopupContext);
  const [data] = useState(getUnifiedData() || []);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', faixaEtaria: 'Todas' });
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Elogios por Categoria',
        data: [],
        backgroundColor: [],
      }
    ]
  });

  useEffect(() => {
    const categoriaCountsHoje = JSON.parse(localStorage.getItem('categoriaCountsHoje')) || {};
    if (!popupShownToday) {
      for (const categoria in categoriaCountsHoje) {
        if (categoriaCountsHoje[categoria] === 3) {
          handlePopup(`A categoria "${categoria}" recebeu 3 elogios hoje!`);
          break;
        }
      }
    }
  }, [handlePopup, popupShownToday]);

  const categorizarPorFaixaEtaria = (idade) => {
    if (idade >= 18 && idade <= 30) return '18-30';
    if (idade >= 31 && idade <= 45) return '31-45';
    if (idade >= 46 && idade <= 60) return '46-60';
    if (idade >= 61) return '61+';
    return 'Indefinido';
  };

  useEffect(() => {
    const filteredData = data.filter(elogio => {
      const elogioDate = new Date(elogio.data);
      const startDate = filters.startDate ? new Date(filters.startDate) : new Date('1970-01-01');
      const endDate = filters.endDate ? new Date(filters.endDate) : new Date();
      const faixaEtariaMatch = filters.faixaEtaria === 'Todas' || categorizarPorFaixaEtaria(elogio.idade) === filters.faixaEtaria;

      return elogioDate >= startDate && elogioDate <= endDate && faixaEtariaMatch;
    });

    const categoryCounts = filteredData.reduce((acc, curr) => {
      acc[curr.categoria] = (acc[curr.categoria] || 0) + 1;
      return acc;
    }, {});

    const totalElogios = filteredData.length;
    const categoryPercentages = Object.values(categoryCounts).map(count => ((count / totalElogios) * 100).toFixed(2));

    // Definir as cores personalizadas
    const backgroundColors = [
      '#0077b6', // Azul mais escuro
      '#89A8B2', // Azul médio
      '#FF7F3E', // Azul claro
      '#FFDA78', // Azul muito claro
      '#03045e'  // Azul escuro
    ];

    setChartData({
      labels: Object.keys(categoryCounts),
      datasets: [
        {
          label: 'Elogios por Categoria',
          data: Object.values(categoryCounts),
          backgroundColor: backgroundColors.slice(0, Object.keys(categoryCounts).length),
          percentage: categoryPercentages
        }
      ]
    });

    // Armazenar contagem de categorias hoje no localStorage
    const categoriaCountsHoje = filteredData.reduce((acc, curr) => {
      const currDate = new Date(curr.data);
      if (currDate.toDateString() === new Date().toDateString()) {
        acc[curr.categoria] = (acc[curr.categoria] || 0) + 1;
      }
      return acc;
    }, {});

    localStorage.setItem('categoriaCountsHoje', JSON.stringify(categoriaCountsHoje));
  }, [filters, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  return (
    <Container style={{ width: '1000px' }}>
      <h3>Gráfico</h3>
      <Row>
        <Col md={6}>
          <Form.Group controlId="startDate">
            <Form.Label>Data de Início</Form.Label>
            <Form.Control type="date" name="startDate" value={filters.startDate} onChange={handleInputChange} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="endDate">
            <Form.Label>Data de Fim</Form.Label>
            <Form.Control type="date" name="endDate" value={filters.endDate} onChange={handleInputChange} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="faixaEtaria">
            <Form.Label>Faixa Etária</Form.Label>
            <Form.Control as="select" name="faixaEtaria" value={filters.faixaEtaria} onChange={handleInputChange}>
              <option value="Todas">Todas</option>
              <option value="18-30">18 a 30</option>
              <option value="31-45">31 a 45</option>
              <option value="46-60">46 a 60</option>
              <option value="61+">Acima de 61</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <div style={{ width: '100%', height: '400px', margin: '0 auto' }}>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Elogios por Categoria',
                font: {
                  size: 22,
         
                }
              },
              legend: {
                labels: {
                  font: {
                    size: 16,
                 
                  }
                }
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    const percentage = chartData.datasets[0].percentage[tooltipItem.dataIndex];
                    return `${tooltipItem.label}: ${tooltipItem.raw} (${percentage}%)`;
                  }
                }
              }
            },
            scales: {
              x: {
                ticks: {
                  font: {
                    size: 14,
                      
             
                  }
                }
              },
              y: {
                ticks: {
                  font: {
                    size: 16,
                
                  }
                }
              }
            }
          }}
        />
      </div>
    </Container>
  );
};

export default ElogieGrafico;
