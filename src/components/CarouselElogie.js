import React from 'react';
import { Carousel } from 'react-bootstrap';

const CarouselComponent = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img className="d-block w-100" src="./images/image1.svg" alt="Primeiro slide" />
        <Carousel.Caption><h4>Desenvolvimento Psicosocial</h4>
        <p>O elogio pode ajudar a desenvelver a autoestima e a fortacelecer as relações.</p></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="./images/image2.svg" alt="Segundo slide" />
        <Carousel.Caption><h4>Aprendizado</h4>
        <p>O elogio ajuda as crianças a se sentirem motivadas e a desenvolver autoconfiança.</p></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="./images/image3.svg" alt="Terceiro slide" />
        <Carousel.Caption><h4>Aumenta produtividade</h4>
        <p>Um estudo da Intel e da Duke University mostrou que elogios verbais podem ser mais eficazes na produtividade do que dinheiro.</p></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img className="d-block w-100" src="./images/image4.svg" alt="Quarto slide" />
        <Carousel.Caption><h4>Senso de reciprocidade</h4>
        <p>As pessoas são mais propensas a acompanhar um elogio com uma ação prestativa. Uma boa ação leva a outra.</p></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    
  );
};

export default CarouselComponent;


