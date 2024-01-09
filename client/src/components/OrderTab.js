import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Card, Button, Modal, Form, Dropdown } from 'react-bootstrap';
import { getAllOrders, setOrderExecutor } from '../http/OrdersApi';
import { getAllExecutors } from '../http/ExecutorsApi';

const OrdersTab = () => {
    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedExecutor, setSelectedExecutor] = useState(null);
    const [executors, setExecutors] = useState([]);
    const [selectedOrderId, setSelectedOrderId] = useState(null);

    const fetchData = async () => {
        try {
            const ordersData = await getAllOrders();
            setOrders(ordersData);

            const executorsData = await getAllExecutors();
            setExecutors(executorsData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {

        fetchData();
    }, []);

    const handleAssignExecutor = (orderId) => {
        console.log('Assign Executor button clicked for orderId:', orderId);
        setSelectedOrderId(orderId);
        setShowModal(true);
    };

    useEffect(() => {
        console.log('Selected Order ID (in useEffect):', selectedOrderId);
        console.log('Selected Executor (in useEffect):', selectedExecutor);
    }, [selectedOrderId, selectedExecutor]);

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedExecutor(null);
        setSelectedOrderId(null);
        fetchData();
    };

    const handleSaveExecutor = async () => {
        console.log('Selected Executor:', selectedExecutor);
        console.log('Selected Order ID:', selectedOrderId);

        if (selectedExecutor !== null && selectedOrderId !== null) {
            try {
                await setOrderExecutor(selectedOrderId, selectedExecutor.idExecutor);
                console.log('Executor assigned successfully!');
            } catch (error) {
                console.error('Error assigning executor:', error);
            }
        }

        handleCloseModal();
    };

    return (<>
        <Tabs defaultActiveKey="order" id="order-tabs">
            <Tab eventKey="order" title="Orders">
                <div>
                    {orders.map((order) => (
                        <Card key={order.idOrder} style={{ width: '18rem', margin: '10px' }}>
                            <Card.Body>
                                <Card.Title>{order.Service.ServiceName}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{order.OrderComment}</Card.Subtitle>
                                <Card.Text>
                                    Start: {new Date(order.OrderStart).toLocaleString()} <br />
                                    End: {new Date(order.OrderEnd).toLocaleString()} <br />
                                    Address: {order.OrderAddress} <br />
                                    Executor: {order.Executor ? order.Executor.ExecutorName : 'Not assigned'}
                                </Card.Text>
                                {order.idExecutor === null && (
                                    <Button
                                        variant="primary"
                                        onClick={() => handleAssignExecutor(order.idOrder)}
                                    >
                                        Assign Executor
                                    </Button>
                                )}
                            </Card.Body>
                        </Card>
                    ))}
                </div>
            </Tab>

            {/* Modal for assigning executor */}

        </Tabs>

        <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
                <Modal.Title>Assign Executor</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group controlId="formExecutor">
                    <Form.Label>Select Executor</Form.Label>
                    <Dropdown onSelect={(eventKey) => setSelectedExecutor(executors[eventKey])}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            {selectedExecutor ? selectedExecutor.executorName : 'Select Executor'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {executors.map((executor, index) => (
                                <Dropdown.Item key={index} eventKey={index}>
                                    {executor.executorName}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveExecutor}>
                    Save Executor
                </Button>
            </Modal.Footer>
        </Modal>
    </>
    );
};

export default OrdersTab;
