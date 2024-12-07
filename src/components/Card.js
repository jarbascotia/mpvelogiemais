import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

function VideoCard({ title, text, videoUrl, imgUrl }) {
  return (
    <Card style={{ width: '220px' }} className="d-flex flex-column align-items-center">
      <Card.Img variant="top" src={imgUrl} style={{ width: '160px', height: 'auto' }} />
      <Card.Body className="d-flex flex-column align-items-center">
        <Card.Title className="text-center">{title}</Card.Title>
        <Card.Text className="text-center">{text}</Card.Text>
        <Button variant="primary" href={videoUrl} target="_blank">Assita</Button>
      </Card.Body>
    </Card>
  );
}

function VideoCardGrid() {
  const videos = [
    { text: 'A Importância do Elogio', videoUrl: 'https://www.youtube.com/watch?v=WpYztDDL9-E', imgUrl: 'https://img.youtube.com/vi/WpYztDDL9-E/0.jpg' },
    { text: 'A Psicologia do Elogio', videoUrl: 'https://www.youtube.com/watch?v=HW-iXbgjqpQ', imgUrl: 'https://img.youtube.com/vi/HW-iXbgjqpQ/0.jpg' },
    { text: 'Elogiar crianças', videoUrl: 'https://www.youtube.com/watch?v=8hrX2_iSApY', imgUrl: 'https://img.youtube.com/vi/8hrX2_iSApY/0.jpg' },
    { text: 'Elogie Mais ', videoUrl: 'https://www.youtube.com/watch?v=-njJYSiy0ps', imgUrl: 'https://img.youtube.com/vi/-njJYSiy0ps/0.jpg' },
  ];

  return (
    <Container style={{ width: '1000px' }} className="d-flex justify-content-center">
      <Row>
        {videos.map((video, index) => (
          <Col key={index} className="d-flex justify-content-center">
            <VideoCard {...video} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default VideoCardGrid;
