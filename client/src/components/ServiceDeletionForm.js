// ServiceDeletionForm.js
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ServiceDeletionForm = ({ show, handleClose, handleDeleteService, serviceId }) => {
  const handleDelete = () => {
    handleDeleteService(serviceId);
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Подтверждение удаления услуги</Modal.Title>
      </Modal.Header>
      <Modal.Body>Вы уверены, что хотите удалить эту услугу?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="primary" onClick={handleDelete}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceDeletionForm;
