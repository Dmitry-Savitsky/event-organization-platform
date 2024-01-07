import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { getAllServices } from "../http/ServicesApi";
import { observer } from "mobx-react-lite";
import ServiceCard from "../components/ServiceCard"; // Import the ServiceCard component

const ServicesPage = () => {
    const [services, setServices] = useState([]);
  
    const [sortBy, setSortBy] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
  
    const resetFilters = () => {
      setSortBy("");
      setSearchQuery("");
    };
  
    useEffect(() => {
      // Fetch services when the component mounts
      getAllServices().then((data) => {
        setServices(data);
      });
    }, []);
  
    const sortData = (data) => {
      if (sortBy === "price_asc") {
        return [...data].sort((a, b) => a.servicePrice - b.servicePrice);
      } else if (sortBy === "price_desc") {
        return [...data].sort((a, b) => b.servicePrice - a.servicePrice);
      } else {
        return data;
      }
    };
  
    const searchData = (data) => {
      if (searchQuery) {
        return data.filter((service) =>
          service.ServiceName.toLowerCase().includes(searchQuery.toLowerCase())
        );
      } else {
        return data;
      }
    };
  
    const sortedData = sortData(services);
    const searchedData = searchData(sortedData);
  
    return (
      <Container className="mt-2">
        <Row>
          <Col xs={2} md={2} className="mt-2">
            <Form>
              <Form.Label>Сортировать по цене:</Form.Label>
              <Form.Select
                style={{ cursor: "pointer" }}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="">Без сортировки</option>
                <option value="price_asc">По возрастанию</option>
                <option value="price_desc">По убыванию</option>
              </Form.Select>
            </Form>
            <Form>
              <Form.Label>Поиск по названию:</Form.Label>
              <Form.Control
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Form>
            <Form className="mb-2 mt-2">
              <Button variant="secondary" onClick={() => resetFilters()}>
                Сбросить
              </Button>
            </Form>
          </Col>
          <Col xs={9} md={9}>
            <Row>
              {searchedData.map((service) => (
                <ServiceCard key={service.idService} service={service} />
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default observer(ServicesPage);