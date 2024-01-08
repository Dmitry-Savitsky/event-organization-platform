    import React, { useState, useEffect } from "react";
    import { useParams } from "react-router-dom";
    import { getOneService } from "../http/ServicesApi";
    import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
    import { jwtDecode } from 'jwt-decode';
    import { createOrder } from "../http/OrdersApi";

    const ServicePage = () => {

        const token = localStorage.getItem('token');
        const decodedToken = token ? jwtDecode(token) : null;
        const idClient = decodedToken.userid;

        const { id } = useParams();
        const [service, setService] = useState(null);
        const [showOrderForm, setShowOrderForm] = useState(false);
        const [orderData, setOrderData] = useState({
            OrderComment: '',
            OrderStart: '',
            OrderEnd: '',
            OrderAddress: '',
            idClients: idClient, // Fill this with the appropriate client ID
            idServices: id, // Fill this with the appropriate service ID
        });

        useEffect(() => {
            if (id && /^\d+$/.test(id)) {
                const fetchService = async () => {
                    try {
                        const serviceData = await getOneService(id);
                        setService(serviceData);
                    } catch (error) {
                        console.error("Error fetching service:", error);
                    }
                };

                fetchService();
            } else {
                console.error("Invalid idService:", id);
            }
        }, [id]);

        if (!service) {
            return <div>Loading...</div>;
        }

        const handleOrderButtonClick = () => {
            setShowOrderForm(true);
        };

        const handleOrderFormClose = () => {
            setShowOrderForm(false);
        };

        const handleChange = (e) => {
            const { name, value } = e.target;
            setOrderData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        };

        const handleSubmit = async (e) => {
            e.preventDefault();
            try {
                const data = await createOrder(orderData);
                console.log('Order created:', data.Order);
                handleOrderFormClose();
            } catch (error) {
                console.error('Error creating order:', error);
                // Handle the error, e.g., show an error message to the user
            }
        };


        return (
            <Container fluid className="bg-dark p-4 text-white">
                <Row>
                    <Col xs={12} md={6} className="mb-4">
                        <img
                            src={process.env.REACT_APP_API_URL + service.img}
                            alt={service.ServiceName}
                            className="img-fluid mt-4"
                            style={{ borderRadius: '5px' }}
                        />
                    </Col>
                    <Col xs={12} md={6}>
                        <h2 className="mb-3">{service.ServiceName}</h2>
                        <div className="mb-3">
                            <strong>Type:</strong> {service.ServiceType}
                        </div>
                        <div className="mb-3">
                            <strong>Price:</strong> {service.ServicePrice}
                        </div>
                        <div className="mb-3">
                            <strong>Company:</strong> {service.Company.CompanyName}
                        </div>
                        <div className="mb-3">
                            <strong>Company Phone:</strong> {service.Company.CompanyPhone}
                        </div>
                        <div>
                            <Button variant="primary" onClick={handleOrderButtonClick}>
                                Забронировать
                            </Button>
                        </div>
                    </Col>
                </Row>

                <Modal show={showOrderForm} onHide={handleOrderFormClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Create Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="OrderComment">
                                <Form.Label>Comment</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="OrderComment"
                                    value={orderData.OrderComment}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="OrderStart">
                                <Form.Label>Start Date and Time</Form.Label>
                                <Form.Control
                                    type="datetime-local"  // Change input type to datetime-local
                                    name="OrderStart"
                                    value={orderData.OrderStart}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="OrderEnd">
                                <Form.Label>End Date and Time</Form.Label>
                                <Form.Control
                                    type="datetime-local"  // Change input type to datetime-local
                                    name="OrderEnd"
                                    value={orderData.OrderEnd}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="OrderAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="OrderAddress"
                                    value={orderData.OrderAddress}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Create Order
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>

            </Container>
        );
    };

    export default ServicePage;
