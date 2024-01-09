// ShowExecutorsModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { getAllExecutors } from '../http/ExecutorsApi'; // Assuming the executor file is in the same directory

const ShowExecutorsModal = ({ show, onHide }) => {
  const [executors, setExecutors] = useState([]);

  useEffect(() => {
    const fetchExecutors = async () => {
      try {
        const executorsData = await getAllExecutors();
        setExecutors(executorsData);
      } catch (error) {
        console.error('Error fetching executors:', error);
      }
    };

    fetchExecutors();
  }, []);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Executors</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container>
          <Row>
            {executors.map((executor) => (
              <Col key={executor.idExecutor} md={4}>
                <Card style={{ marginBottom: '10px' }}>
                  {/* You can add an image if you have it */}
                  {/* <Card.Img variant="top" src={process.env.REACT_APP_API_URL + executor.img}/> */}
                  <Card.Body>
                    <Card.Title>{executor.executorName}</Card.Title>
                    <Card.Text>
                      Phone: {executor.executorPhone}
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

export default ShowExecutorsModal;
