import React, { useState } from "react";
import { Modal, Form, Button } from 'react-bootstrap';
import { jwtDecode } from 'jwt-decode';

const ServiceForm = ({ show, handleClose, handleAddService }) => {
  const token = localStorage.getItem('token');
  const decodedToken = token ? jwtDecode(token) : null;
  const companyid = decodedToken.userid;

  const [formData, setFormData] = useState({
    serviceName: "",
    serviceType: "",
    servicePrice: "",
    idCompany: companyid,
    img: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === 'img') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0],
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleAddServiceWithImage = async () => {
    const { serviceName, serviceType, servicePrice, idCompany, img } = formData;

    // Check if all required fields are filled
    if (!serviceName || !serviceType || !servicePrice || !idCompany || !img) {
      // Handle the error, for example, show an alert or set an error state
      return;
    }

    const formDataForService = new FormData();
    formDataForService.append('ServiceName', serviceName);
    formDataForService.append('ServiceType', serviceType);
    formDataForService.append('ServicePrice', servicePrice);
    formDataForService.append('idCompany', idCompany);
    formDataForService.append('img', img);

    try {
      // Call the handleAddService function with the new formDataForService
      await handleAddService(formDataForService);
      handleClose();
    } catch (error) {
      console.error('Error adding service with image:', error);
      // Handle the error, for example, show an alert or set an error state
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
                <Modal.Title>Добавить услугу</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                <Form.Group controlId="serviceName">
                        <Form.Label>Название услуги</Form.Label>
                        <Form.Control
                            type="text"
                            name="serviceName"
                            value={formData.serviceName}
                            onChange={handleChange}
                            placeholder="Введите название услуги"
                        />
                    </Form.Group>

                    <Form.Group controlId="serviceType">
                        <Form.Label>Тип услуги</Form.Label>
                        <Form.Control
                            type="text"
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleChange}
                            placeholder="Введите тип услуги"
                        />
                    </Form.Group>

                    <Form.Group controlId="servicePrice">
                        <Form.Label>Стоимость услуги</Form.Label>
                        <Form.Control
                            type="text"
                            name="servicePrice"
                            value={formData.servicePrice}
                            onChange={handleChange}
                            placeholder="Введите стоимость услуги"
                        />
                    </Form.Group>

                    <Form.Group controlId="img">
                        <Form.Label>Выберите изображение</Form.Label>
                        <Form.Control
                            type="file"
                            name="img"
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Закрыть
        </Button>
        <Button variant="primary" onClick={handleAddServiceWithImage}>
          Добавить
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceForm;
