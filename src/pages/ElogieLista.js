import React, { useState, useContext, useEffect } from 'react';
import { getUnifiedData } from '../utils/readData';
import { Container, Row, Col, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import PopupContext from '../context/PopupContext';
import { format } from 'date-fns';
import './ElogioLista.css'; // Importando o arquivo CSS

const ElogieLista = () => {
  const { handlePopup, popupShownToday } = useContext(PopupContext);
  const [data] = useState(getUnifiedData());
  const [filters, setFilters] = useState({
    nome: '',
    cpf: '',
    faixaEtaria: 'Todas',
    data: null,
    tipoData: 'intervalo', // Pode ser 'dia', 'mes', 'ano' ou 'intervalo'
    faixaDeDias: { start: null, end: null },
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setFilters({
      ...filters,
      faixaDeDias: { start, end },
      data: null, // Reset single date filter
    });
  };

  const handleSingleDateChange = (date) => {
    setFilters({
      ...filters,
      data: date,
      faixaDeDias: { start: null, end: null }, // Reset range date filter
    });
  };

  const handleModoSelecionaDataChange = (e) => {
    setFilters({
      ...filters,
      tipoData: e.target.value,
      data: null,
      faixaDeDias: { start: null, end: null }, // Reset other filters
    });
  };

  const formatCPF = (cpf) => {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const filteredData = data.filter(elogio => {
    const elogioDate = new Date(elogio.data);
    let dataMatch = true;

    if (filters.tipoData === 'dia' && filters.data) {
      dataMatch = elogioDate.toISOString().split('T')[0] === filters.data.toISOString().split('T')[0];
    } else if (filters.tipoData === 'mes' && filters.data) {
      dataMatch = elogioDate.getMonth() === filters.data.getMonth() && elogioDate.getFullYear() === filters.data.getFullYear();
    } else if (filters.tipoData === 'ano' && filters.data) {
      dataMatch = elogioDate.getFullYear() === filters.data.getFullYear();
    } else if (filters.tipoData === 'intervalo' && filters.faixaDeDias.start && filters.faixaDeDias.end) {
      dataMatch = elogioDate >= filters.faixaDeDias.start && elogioDate <= filters.faixaDeDias.end;
    }

    const faixaEtariaMatch = filters.faixaEtaria === 'Todas' || categorizarPorFaixaEtaria(elogio.idade) === filters.faixaEtaria;

    return (
      (filters.nome === '' || elogio.nome.toLowerCase().includes(filters.nome.toLowerCase())) &&
      (filters.cpf === '' || elogio.cpf.includes(filters.cpf)) &&
      faixaEtariaMatch && dataMatch
    );
  });

  return (
    <Container style={{ width: '1000px' }}>
      <h3>Lista de elogios</h3>
      <Row>
        <Col md={6}>
          <Form.Group controlId="nome">
            <Form.Label>Filtrar por Nome</Form.Label>
            <Form.Control type="text" name="nome" value={filters.nome} onChange={handleInputChange} />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group controlId="cpf">
            <Form.Label>Filtrar por CPF</Form.Label>
            <Form.Control type="text" name="cpf" value={filters.cpf} onChange={handleInputChange} />
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId="tipoData">
            <Form.Label>Tipo de Data</Form.Label>
            <Form.Control as="select" name="tipoData" value={filters.tipoData} onChange={handleModoSelecionaDataChange}>
              <option value="dia">Dia Único</option>
              <option value="mes">Mês Inteiro</option>
              <option value="ano">Ano Inteiro</option>
              <option value="intervalo">Faixa de Dias</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={6}>
          {filters.tipoData === 'intervalo' ? (
            <Form.Group>
              <Form.Label>Selecionar Faixa de Dias</Form.Label>
              <DatePicker
                selectsRange
                startDate={filters.faixaDeDias.start}
                endDate={filters.faixaDeDias.end}
                onChange={handleDateChange}
                isClearable
                placeholderText="Selecionar Faixa de Dias"
              />
            </Form.Group>
          ) : (
            <Form.Group>
              <Form.Label>
                {filters.tipoData === 'dia' ? 'Selecionar Data' :
                filters.tipoData === 'mes' ? 'Selecionar Mês' :
                'Selecionar Ano'}
              </Form.Label>
              <DatePicker
                selected={filters.data}
                onChange={handleSingleDateChange}
                dateFormat={
                  filters.tipoData === 'dia' ? 'yyyy/MM/dd' :
                  filters.tipoData === 'mes' ? 'yyyy/MM' :
                  'yyyy'
                }
                showYearPicker={filters.tipoData === 'ano'}
                showMonthYearPicker={filters.tipoData === 'mes'}
                placeholderText={
                  filters.tipoData === 'dia' ? 'Selecionar Data' :
                  filters.tipoData === 'mes' ? 'Selecionar Mês' :
                  'Selecionar Ano'
                }
              />
            </Form.Group>
          )}
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Form.Group controlId="faixaEtaria">
            <Form.Label>Faixa Etária</Form.Label>
            <Form.Control as="select" name="faixaEtaria" value={filters.faixaEtaria} onChange={handleInputChange}>
              <option value="Todas">Todas as Idades</option>
              <option value="18-30">18 a 30</option>
              <option value="31-45">31 a 45</option>
              <option value="46-60">46 a 60</option>
              <option value="61+">Acima de 61</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <table className="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Elogio</th>
            <th>Data</th>
            <th>CPF</th>
            <th>Idade</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((elogio, index) => (
            <tr key={index}>
              <td>{elogio.nome}</td>
              <td>{elogio.telefone}</td>
              <td>{elogio.elogio}</td>
              <td>{format(new Date(elogio.data), 'dd/MM/yyyy')}</td>
              <td>{formatCPF(elogio.cpf)}</td>
              <td>{elogio.idade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default ElogieLista;