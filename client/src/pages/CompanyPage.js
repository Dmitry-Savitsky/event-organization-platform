import React, { useState } from "react";
import { Button, Container, Row, Tabs, Tab, Stack } from 'react-bootstrap';
import ServiceForm from '../components/ServiceAddingForm';
import { createService, deleteService } from '../http/ServicesApi';
import ServiceModal from "../components/ServiceDeletingForm";
import ServiceUpdateModal from "../components/ServiceUpdatingForm";
import ShowServicesModal from "../components/ServicesShowingForm";

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
            <Button variant='primary'onClick={() => setModalShow(true)}>
              Посмотреть услуги
            </Button>
          </Stack>

          <hr />

          <Row className='p-2'>
            <Button variant='primary'>
              Добавить исполнителя
            </Button>
          </Row>
          <Row className='p-2'>
            <Button variant='primary'>
              Удалить исполнителя
            </Button>
          </Row>
          <Stack direction="horizontal" className="p-2 justify-content-center" gap={2}>
            <Button variant='primary'>
              Редактировать исполнителя
            </Button>
            <Button variant='primary'>
              Посмотреть исполнителей
            </Button>
          </Stack>

          <hr />

        </Tab>

        <Tab eventKey="orders" title="Заказы">

        </Tab>

        <Tab eventKey="comments" title="Комментарии">

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

    </Container>
  );
};

export default Company;
