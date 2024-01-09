// ServiceModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Dropdown, Button } from 'react-bootstrap';
import { getAllServices, deleteService } from '../http/ServicesApi'; // Replace with the actual path to your API file

const ServiceModal = ({ show, handleClose }) => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const serviceData = await getAllServices();
        setServices(serviceData);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  const handleDelete = async () => {
    if (selectedService) {
      try {
        await deleteService(selectedService.idService);
        // You may want to update the services list or perform other actions after deletion
        console.log(`Service with ID ${selectedService.idService} deleted successfully`);
        handleClose();
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Service</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown onSelect={(eventKey) => setSelectedService(JSON.parse(eventKey))}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedService ? selectedService.serviceName : 'Select a service'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {services.map((service) => (
              <Dropdown.Item key={service.idService} eventKey={JSON.stringify(service)}>
                {service.serviceName}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceModal;
