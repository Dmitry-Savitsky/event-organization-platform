import React from "react";
import { Button, Container, Row, Tabs, Tab, Stack, Modal, Form, Dropdown, DropdownButton } from 'react-bootstrap';

const Company = () => {
  return (
    <Container style={{ marginTop: 10 }}>
      <Tabs
        id="company-tabs"
        className="mb-3"
      >
        <Tab eventKey="actions" title="Действия">
          <Row className='p-2'>
            <Button  variant='primary'>
              Добавить услугу
            </Button>
          </Row>
          <Row className='p-2'>
            <Button  variant='primary'>
              Удалить услугу
            </Button>
          </Row>
          <Stack direction="horizontal" className="p-2 justify-content-center" gap={2}>
            <Button  variant='primary'>
              Редактировать услугу
            </Button>
            <Button  variant='primary'>
              Посмотреть услугу
            </Button>
          </Stack>
          
          <hr />

          <Row className='p-2'>
            <Button  variant='primary'>
              Добавить исполнителя
            </Button>
          </Row>
          <Row className='p-2'>
            <Button  variant='primary'>
              Удалить исполнителя
            </Button>
          </Row>
          <Stack direction="horizontal" className="p-2 justify-content-center" gap={2}>
            <Button  variant='primary'>
              Редактировать исполнителя
            </Button>
            <Button  variant='primary'>
              Посмотреть исполнителя
            </Button>
          </Stack>
          
          <hr />


        </Tab>

        <Tab eventKey="applications" title="Заявки">

        </Tab>

      </Tabs>
    </Container>
  )
};

export default Company;


//
//