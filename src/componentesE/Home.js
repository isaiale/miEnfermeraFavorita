import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { getVentasTotales } from "../url/UrlVistasAdmin";

const Home = () => {
  const [greeting, setGreeting] = useState("");
  const [dailySales, setDailySales] = useState(0);
  const [newOffers, setNewOffers] = useState([]);
  const [ventasTotales, setVentasTotales] = useState(0);
  const [productosMasVendidos, setProductosMasVendidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [productosConDescuento, setProductosConDescuento] = useState([]);

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

    const fetchVentasTotales = async () => {
      try {
        const data = await getVentasTotales();
        setVentasTotales(data.totalVentas);
        setProductosMasVendidos(data.productosMasVendidos);
        setProductos(data.productos);
        setProductosConDescuento(data.productosConDescuento);
      } catch (error) {
        console.error("Error al obtener las ventas totales:", error);
      }
    };

    fetchVentasTotales();
  }, []);

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>{greeting}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                ¡Bienvenido!
              </Card.Subtitle>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="mt-4 d-flex justify-content-between align-items-start flex-wrap">
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Ventas del día</Card.Title>
              <h2>{dailySales}</h2>
            </Card.Body>
          </Card>
          {/* <Card className="mb-4">
            <Card.Body>
              <Card.Title>Nuevas ofertas</Card.Title>
              <ul>
                {newOffers.map((offer, index) => (
                  <li key={index}>{offer}</li>
                ))}
              </ul>
            </Card.Body>
          </Card> */}
        </Col>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Ventas Totales</Card.Title>
              <h2>${ventasTotales}</h2>
            </Card.Body>
          </Card>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Productos de Renta Más Vendidos</Card.Title>
              <ul>
                {productosMasVendidos.map((producto, index) => (
                  <li key={index}>{producto.nombre}: {producto.totalVendidos} unidades vendidas</li>
                ))}
              </ul>
            </Card.Body>
          </Card>
          {/* <Card className="mb-4">
            <Card.Body>
              <Card.Title>Todos los Productos</Card.Title>
              <ul>
                {productos.map((producto, index) => (
                  <li key={index}>{producto.nombre}: ${producto.precio}</li>
                ))}
              </ul>
            </Card.Body>
          </Card> */}
          {/* <Card className="mb-4">
            <Card.Body>
              <Card.Title>Productos con Descuento</Card.Title>
              <ul>
                {productosConDescuento.map((producto, index) => (
                  <li key={index}>{producto.nombre}: ${producto.precio} ({producto.descuento}% descuento)</li>
                ))}
              </ul>
            </Card.Body>
          </Card> */}
        </Col>
      </div>
    </Container>
  );
};

export default Home;
