import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const HomeGerente = () => {
  const [greeting, setGreeting] = useState("");
  const [dailySales, setDailySales] = useState(0);
  const [newOffers, setNewOffers] = useState([]);

  useEffect(() => {
    const getCurrentTime = () => {
      const currentDate = new Date();
      const currentHour = currentDate.getHours();

      if (currentHour >= 6 && currentHour < 12) {
        setGreeting("Buenos días");
      } else if (currentHour >= 12 && currentHour < 18) {
        setGreeting("Buenas tardes");
      } else {
        setGreeting("Buenas noches");
      }
    };

    getCurrentTime();

    const fetchDailySales = () => {
      const randomSales = Math.floor(Math.random() * 100) + 1;
      setDailySales(randomSales);
    };

    fetchDailySales();

    const fetchNewOffers = () => {
      const offers = ["Oferta 1", "Oferta 2", "Oferta 3"];
      setNewOffers(offers);
    };

    fetchNewOffers();
  }, []);

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>{greeting}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                ¡Bienvenido gerente!
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="mt-4 d-flex justify-content-between align-items-start flex-wrap">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Ventas del día</Card.Title>
              <h2>{dailySales}</h2>
            </Card.Body>
          </Card>
          <Card className="mt-4">
            <Card.Body>
              <Card.Title>Nuevas ofertas</Card.Title>
              <ul>
                {newOffers.map((offer, index) => (
                  <li key={index}>{offer}</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </Container>
  );
};

export default HomeGerente;
