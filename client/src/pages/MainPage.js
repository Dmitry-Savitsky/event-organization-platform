import React from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <Container
      className="main-page-container mt-5 text-center rounded"
      style={{
        background: "linear-gradient(to right, #343a40, #6c757d)",
        color: "#fff",
        padding: "20px",
      }}
    >
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

      <h2>Почему выбирать нас?</h2>
      <ListGroup className="text-left">
        <ListGroup.Item>Гибкий выбор услуг</ListGroup.Item>
        <ListGroup.Item>Эксклюзивные локации</ListGroup.Item>
        <ListGroup.Item>Индивидуальные пакеты услуг</ListGroup.Item>
        <ListGroup.Item>Комфортабельное размещение</ListGroup.Item>
      </ListGroup>
    </Container>
  );
};

export default MainPage;
