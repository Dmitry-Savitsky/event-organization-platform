import React, { useState } from "react";
import { Button, Container, Row, Tabs, Tab, Stack } from 'react-bootstrap';
import ServiceForm from '../components/ServiceAddingForm';
import { createService, deleteService } from '../http/ServicesApi';
import ServiceModal from "../components/ServiceDeletingForm";
import ServiceUpdateModal from "../components/ServiceUpdatingForm";
import ShowServicesModal from "../components/ServicesShowingForm";
import ExecutorForm from '../components/ExecutorAddingForm';
import { createExecutor } from '../http/ExecutorsApi';
import ExecutorModal from '../components/ExecutorDeletingForm'; // Replace with the actual path to your ExecutorModal file
import ExecutorUpdateModal from '../components/ExecutorsUpdateForm';
import ShowExecutorsModal from '../components/ExecutorsShowingForm';
import CommentsTab from "../components/CommentsTab";
import OrdersTab from "../components/OrderTab";


const Company = () => {

  const [showServiceForm, setShowServiceForm] = useState(false);
  const handleShowServiceForm = () => {
    setShowServiceForm(true);
  };
  const handleCloseServiceForm = () => {
    setShowServiceForm(false);
  };
  const handleAddService = async (formData) => {
    try {
      await createService(formData);
      handleCloseServiceForm();
    } catch (error) {
      console.error('Ошибка при добавлении услуги:', error);
      // setErrorState(true);
    }
  };


  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);


  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleShowUpdateModal = () => setShowUpdateModal(true);
  const handleHideUpdateModal = () => setShowUpdateModal(false);


  const [modalShow, setModalShow] = useState(false);


  const [showExecutorForm, setShowExecutorForm] = useState(false);
  const handleShowExecutorForm = () => {
    setShowExecutorForm(true);
  };
  const handleCloseExecutorForm = () => {
    setShowExecutorForm(false);
  };
  const handleAddExecutor = async (formData) => {
    try {
      await createExecutor(formData);
      handleCloseExecutorForm();
    } catch (error) {
      console.error('Ошибка при добавлении исполнителя:', error);
      // Handle the error, for example, show an alert or set an error state
    }
  };


  const [showExecutorModal, setShowExecutorModal] = useState(false);
  const handleShowExecutorModal = () => {
    setShowExecutorModal(true);
  };
  const handleCloseExecutorModal = () => {
    setShowExecutorModal(false);
  };


  const [showExecutorUpdateModal, setShowExecutorUpdateModal] = useState(false);
  const handleShowExecutorUpdateModal = () => {
    setShowExecutorUpdateModal(true);
  };
  const handleCloseExecutorUpdateModal = () => {
    setShowExecutorUpdateModal(false);
  };


  const [showExecutorsModal, setShowExecutorsModal] = useState(false);
  const handleShowExecutorsModal = () => {
    setShowExecutorsModal(true);
  };
  const handleCloseExecutorsModal = () => {
    setShowExecutorsModal(false);
  };

  return (
    <Container style={{ marginTop: 10, borderRadius: "10px" }}>
      <Tabs id="company-tabs" className="mb-3">
        <Tab eventKey="actions" title="Действия">
          <Row className='p-2'>
            <Button variant='primary' onClick={handleShowServiceForm}>
              Добавить услугу
            </Button>
          </Row>
          <Row className='p-2'>
            <Button variant="primary" onClick={handleShowModal}>
              Удалить услугу
            </Button>
          </Row>
          <Stack direction="horizontal" className="p-2 justify-content-center" gap={2}>
            <Button variant='primary' onClick={handleShowUpdateModal}>
              Редактировать услугу
            </Button>
            <Button variant='primary' onClick={() => setModalShow(true)}>
              Посмотреть услуги
            </Button>
          </Stack>

          <hr />

          <Row className='p-2'>
            <Button variant='primary' onClick={handleShowExecutorForm}>
              Добавить исполнителя
            </Button>
          </Row>
          <Row className='p-2'>
            <Button variant='primary' onClick={handleShowExecutorModal}>
              Удалить исполнителя
            </Button>
          </Row>
          <Stack direction="horizontal" className="p-2 justify-content-center" gap={2}>
            <Button variant='primary' onClick={handleShowExecutorUpdateModal}>
              Редактировать исполнителя
            </Button>
            <Button variant='primary' onClick={handleShowExecutorsModal}>
              Посмотреть исполнителей
            </Button>
          </Stack>

          <hr />

        </Tab>

        <Tab eventKey="orders" title="Заказы">
        <OrdersTab />
        </Tab>

        <Tab eventKey="comments" title="Комментарии">
          <CommentsTab />
        </Tab>

      </Tabs>

      {/* Показать/скрыть форму добавления услуги */}
      <ServiceForm
        show={showServiceForm}
        handleClose={handleCloseServiceForm}
        handleAddService={handleAddService}
      />

      <ServiceModal show={showModal} handleClose={handleCloseModal} />

      <ServiceUpdateModal show={showUpdateModal} onHide={handleHideUpdateModal} />

      <ShowServicesModal show={modalShow} onHide={() => setModalShow(false)} />

      <ExecutorForm
        show={showExecutorForm}
        handleClose={handleCloseExecutorForm}
        handleAddSomeExecutor={handleAddExecutor}
      />

      <ExecutorModal show={showExecutorModal} handleClose={handleCloseExecutorModal} />

      <ExecutorUpdateModal show={showExecutorUpdateModal} onHide={handleCloseExecutorUpdateModal} />

      <ShowExecutorsModal show={showExecutorsModal} onHide={handleCloseExecutorsModal} />

    </Container>
  );
};

export default Company;
