import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getOneService } from "../http/ServicesApi";
import { Container, Row, Col, Button } from "react-bootstrap";

const ServicePage = () => {
    const { id } = useParams();
    const [service, setService] = useState(null);

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

    return (
        <Container fluid className="bg-dark p-4  text-white">
            <Row>
                <Col xs={12} md={6} className="mb-4">
                    <img
                        src={process.env.REACT_APP_API_URL + service.img}
                        alt={service.ServiceName}
                        className="img-fluid mt-4" // Added top margin to the image
                        style={{ borderRadius: '5px' }}
                    />
                </Col>
                <Col xs={12} md={6}>
                    <div>
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
                        <Button variant="primary">Book Now</Button>
                    </div>

                </Col>
            </Row>
        </Container>
    );
};

export default ServicePage;
