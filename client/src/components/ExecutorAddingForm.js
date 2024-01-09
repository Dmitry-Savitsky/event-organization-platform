// ExecutorAddingForm.jsx
import React, { useState } from "react";
import { Modal, Form, Button } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

const ExecutorForm = ({ show, handleClose, handleAddSomeExecutor }) => {
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const companyId = decodedToken.userid;

  const [formData, setFormData] = useState({
    ExecutorName: "",
    ExecutorPhone: "",
    idCompany: companyId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddExecutorForm = async () => {
    const { ExecutorName, ExecutorPhone, idCompany } = formData;

    // Check if all required fields are filled
    if (!ExecutorName || !ExecutorPhone || !idCompany) {
      // Handle the error, for example, show an alert or set an error state
      return;
    }

    try {
      // Call the handleAddExecutor function with the new formData
      await handleAddSomeExecutor(formData);
      handleClose();
    } catch (error) {
      console.error('Error adding executor:', error);
      // Handle the error, for example, show an alert or set an error state
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить исполнителя</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="ExecutorName">
            <Form.Label>Имя исполнителя</Form.Label>
            <Form.Control
              type="text"
              name="ExecutorName"
              value={formData.ExecutorName}
              onChange={handleChange}
              placeholder="Введите имя исполнителя"
            />
          </Form.Group>

          <Form.Group controlId="ExecutorPhone">
            <Form.Label>Телефон исполнителя</Form.Label>
            <Form.Control
              type="text"
              name="ExecutorPhone"
              value={formData.ExecutorPhone}
              onChange={handleChange}
              placeholder="Введите телефон исполнителя"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={handleAddExecutorForm}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ExecutorForm;
