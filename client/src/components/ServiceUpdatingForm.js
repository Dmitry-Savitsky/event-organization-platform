import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
import { getAllServices, updateService } from '../http/ServicesApi'; // Import your API functions

const ServiceUpdateModal = ({ show, onHide }) => {
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState(null);
    const [serviceData, setServiceData] = useState({
        serviceName: '',
        serviceType: '',
        servicePrice: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const servicesData = await getAllServices();
                setServices(servicesData);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };

        fetchData();
    }, []);

    const handleServiceSelect = (selectedId) => {
        const selected = services.find((service) => service.idService == selectedId);

        console.log(selectedId);
        setSelectedService(selected);
        setServiceData({
            serviceName: selected.serviceName,
            serviceType: selected.serviceType,
            servicePrice: selected.servicePrice,
        });
    };

    const handleUpdate = async () => {
        try {
            // Pass the serviceData object to the updateService function
            await updateService(selectedService.idService, serviceData);
            // Optionally, you can handle success or close the modal
            onHide();
        } catch (error) {
            console.error('Error updating service:', error);
        }
    };
    

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Update Service</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="serviceDropdown">
                        <Form.Label>Select Service</Form.Label>
                        <Dropdown onSelect={(selectedId) => handleServiceSelect(selectedId)}>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                {selectedService ? selectedService.serviceName : 'Select Service'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {services.map((service) => (
                                    <Dropdown.Item key={service.idService} eventKey={service.idService}>
                                        {service.serviceName}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>

                    {selectedService && (
                        <div>
                            {/* Render fields for updating service data */}
                            <Form.Group controlId="serviceName">
                                <Form.Label>Service Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter service name"
                                    value={serviceData.serviceName}
                                    onChange={(e) => setServiceData({ ...serviceData, serviceName: e.target.value })}
                                />
                            </Form.Group>
                            <Form.Group controlId="serviceType">
                                <Form.Label>Service Type</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter service type"
                                    value={serviceData.serviceType}
                                    onChange={(e) => setServiceData({ ...serviceData, serviceType: e.target.value })}
                                />
                            </Form.Group>

                            <Form.Group controlId="servicePrice">
                                <Form.Label>Service Price</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter service price"
                                    value={serviceData.servicePrice}
                                    onChange={(e) => setServiceData({ ...serviceData, servicePrice: e.target.value })}
                                />
                            </Form.Group>
                            {/* Add similar blocks for other fields (serviceType, servicePrice, img) */}

                            <Button variant="primary" onClick={handleUpdate}>
                                Update Service
                            </Button>
                        </div>
                    )}
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ServiceUpdateModal;
