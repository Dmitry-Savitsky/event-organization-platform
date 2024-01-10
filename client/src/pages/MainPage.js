import React, { useState } from "react";
import { Container, ListGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const MainPage = () => {
  const listItems = [
    "Гибкий выбор услуг",
    "Эксклюзивные локации",
    "Индивидуальные пакеты услуг",
    "Комфортабельное размещение",
  ];

  const [activeCardIndex, setActiveCardIndex] = useState(0);

  const handleNextCard = () => {
    setActiveCardIndex((prevIndex) => (prevIndex + 1) % listItems.length);
  };

  const handlePrevCard = () => {
    setActiveCardIndex(
      (prevIndex) => (prevIndex - 1 + listItems.length) % listItems.length
    );
  };

  return (
    <Container
      className="main-page-container mt-5 text-center rounded"
      style={{
        background: "linear-gradient(to right, #343a40, #6c757d)",
        color: "#fff",
        padding: "20px",
      }}
    >
      {/* Content Section */}
      <div className="p-5 mb-4 rounded-3">
      <div className="p-5 mb-4 rounded-3">
        <div className="container-fluid py-5 text-white">
          <h1 className="display-5 fw-bold">
            Добро пожаловать в организацию мероприятий по вашему выбору
          </h1>
          <p className="col-md-8 fs-4 mx-auto">
            Откройте для себя увлекательные возможности самостоятельной организации мероприятий, где вы сами выбираете услуги и создаете идеальный опыт. Будь вы профессионалом в организации мероприятий или новичком, у нас есть всё, что нужно для вашего идеального мероприятия.
          </p>
          <Button as={Link} to="/events" variant="primary">
            Исследовать мероприятия
          </Button>
        </div>
      </div>
      </div>

      {/* Why Choose Us Section */}
      <h2>Почему выбирать нас?</h2>
      <Card className="text-left">
        <Card.Body>
          <Card.Title>{listItems[activeCardIndex]}</Card.Title>
        </Card.Body>
      </Card>
      <div className="mt-3">
        <Button variant="light" onClick={handlePrevCard}>
          &lt;
        </Button>{" "}
        <Button variant="light" onClick={handleNextCard}>
          &gt;
        </Button>
      </div>
    </Container>
  );
};

export default MainPage;
