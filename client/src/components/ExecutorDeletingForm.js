// ExecutorModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Dropdown, Button } from 'react-bootstrap';
import { getAllExecutors, deleteExecutor } from '../http/ExecutorsApi'; // Replace with the actual path to your API file

const ExecutorModal = ({ show, handleClose }) => {
  const [executors, setExecutors] = useState([]);
  const [selectedExecutor, setSelectedExecutor] = useState(null);

  useEffect(() => {
    const fetchExecutors = async () => {
      try {
        const executorData = await getAllExecutors();
        setExecutors(executorData);
      } catch (error) {
        console.error('Error fetching executors:', error);
      }
    };

    fetchExecutors();
  }, []);

  const handleDelete = async () => {
    console.log(selectedExecutor)
    if (selectedExecutor) {
      try {
        await deleteExecutor(selectedExecutor.idExecutor); // Assuming your API endpoint uses 'id'
        // You may want to update the executors list or perform other actions after deletion
        console.log(`Executor with ID ${selectedExecutor.idExecutor} deleted successfully`);
        handleClose();
      } catch (error) {
        console.error('Error deleting executor:', error);
      }
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Executor</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dropdown onSelect={(eventKey) => setSelectedExecutor(JSON.parse(eventKey))}>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            {selectedExecutor ? selectedExecutor.executorName : 'Select an executor'}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {executors.map((executor) => (
              <Dropdown.Item key={executor.id} eventKey={JSON.stringify(executor)}>
                {executor.executorName}
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

export default ExecutorModal;
