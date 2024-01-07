import React from "react";
import { Button, Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SERVICE_ROUTE } from "../utils/consts";

const ServiceCard = ({ service }) => {
    const navigate = useNavigate();

    return (
        <Col xs={12} sm={6} md={4} lg={3} className="mt-3">
            <Card style={{ width: '100%' }} className="d-flex flex-column h-100">
                {/* Add your service image rendering logic here */}
                <Card.Body className="d-flex flex-column">
                    <Card.Title>{service.serviceName}</Card.Title>
                    <Card.Text className="fw-bold fs-4">{`€${service.servicePrice}`}</Card.Text>
                    <Card.Img
                        variant="top"
                        src={process.env.REACT_APP_API_URL + service.img}
                        style={{ objectFit: 'cover', height: '100%' }}
                    />
                    <Card.Text>
                        <strong>Тип услуги:</strong> {service.serviceType}
                    </Card.Text>
                    {/* Add any additional information you want to display */}
                    <Button
                        variant="dark"
                        onClick={() => navigate(SERVICE_ROUTE + '/' + service.idService)}
                        className="mt-auto"
                    >
                        Подробнее
                    </Button>
                </Card.Body>
            </Card>
        </Col>
    );
};

export default ServiceCard;
