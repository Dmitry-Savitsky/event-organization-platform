// ExecutorUpdateModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';
import { getAllExecutors, updateExecutor } from '../http/ExecutorsApi'; // Import your API functions

const ExecutorUpdateModal = ({ show, onHide }) => {
  const [executors, setExecutors] = useState([]);
  const [selectedExecutor, setSelectedExecutor] = useState(null);
  const [executorData, setExecutorData] = useState({
    executorName: '',
    executorPhone: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const executorsData = await getAllExecutors();
        setExecutors(executorsData);
      } catch (error) {
        console.error('Error fetching executors:', error);
      }
    };

    fetchData();
  }, []);

  const handleExecutorSelect = (selectedId) => {
    const selected = executors.find((executor) => executor.id == selectedId);

    setSelectedExecutor(selected);
    setExecutorData({
      executorName: selected.executorName,
      executorPhone: selected.executorPhone,
    });
  };

  const handleUpdate = async () => {
    try {
      await updateExecutor(selectedExecutor.id, executorData);
      // Optionally, you can handle success or close the modal
      onHide();
    } catch (error) {
      console.error('Error updating executor:', error);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Executor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="executorDropdown">
            <Form.Label>Select Executor</Form.Label>
            <Dropdown onSelect={(selectedId) => handleExecutorSelect(selectedId)}>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                {selectedExecutor ? selectedExecutor.executorName : 'Select Executor'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {executors.map((executor) => (
                  <Dropdown.Item key={executor.id} eventKey={executor.id}>
                    {executor.executorName}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>

          {selectedExecutor && (
            <div>
              {/* Render fields for updating executor data */}
              <Form.Group controlId="executorName">
                <Form.Label>Executor Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter executor name"
                  value={executorData.executorName}
                  onChange={(e) => setExecutorData({ ...executorData, executorName: e.target.value })}
                />
              </Form.Group>
              <Form.Group controlId="executorPhone">
                <Form.Label>Executor Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter executor phone"
                  value={executorData.executorPhone}
                  onChange={(e) => setExecutorData({ ...executorData, executorPhone: e.target.value })}
                />
              </Form.Group>

              <Button variant="primary" onClick={handleUpdate}>
                Update Executor
              </Button>
            </div>
          )}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ExecutorUpdateModal;
