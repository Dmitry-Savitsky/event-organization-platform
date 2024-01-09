// ServicesModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { getAllServices } from '../http/ServicesApi'; // Assuming the services file is in the same directory

const ShowServicesModal = ({ show, onHide }) => {
  const [services, setServices] = useState([]);
    
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await getAllServices();
        setServices(servicesData);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();

  }, []);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Services</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            {services.map((service) => (
              <Col key={service.idService} md={4}>
                <Card style={{ marginBottom: '10px' }}>
                  <Card.Img variant="top" src={process.env.REACT_APP_API_URL + service.img}/>
                  <Card.Body>
                    <Card.Title>{service.serviceName}</Card.Title>
                    <Card.Text>
                      Type: {service.serviceType}
                      
                      <br />

                      Price: ${service.servicePrice}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShowServicesModal;
