import React, { useState } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import imgAccesoriosEnfermeria from "../img/Logo de mi enfermera favorita.jpg";
import Breadcrumb from "../utilidad/migapan";
import "../css/colores.css";

const accesoriosEnfermeria = [
  {
    id: 1,
    nombre: "Accesorio 1",
    categoria: "Accesorios de Enfermería",
    precio: "$5.99",
    imageUrl: imgAccesoriosEnfermeria,
    tipos: ["Estetoscopio", "Tijeras Médicas", "Reloj de Enfermera"],
    colores: ["Blanco", "Azul", "Negro"],
    descuento: "20%",
  },
  {
    id: 2,
    nombre: "Accesorio 2",
    categoria: "Accesorios de Enfermería",
    precio: "$7.99",
    imageUrl: imgAccesoriosEnfermeria,
    tipos: ["Gorra de Enfermera", "Linterna Médica"],
    colores: ["Blanco", "Rosa"],
    descuento: "no aplica",
  },
  {
    id: 3,
    nombre: "Accesorio 3",
    categoria: "Accesorios de Enfermería",
    precio: "$9.99",
    imageUrl: imgAccesoriosEnfermeria,
    tipos: ["Calcetines de Compresión", "Guantes Médicos"],
    colores: ["Azul", "Morado"],
    descuento: "15%",
  },
  {
    id: 4,
    nombre: "Accesorio 4",
    categoria: "Accesorios de Enfermería",
    precio: "$12.99",
    imageUrl: imgAccesoriosEnfermeria,
    tipos: ["Bolsa de Enfermera"],
    colores: ["Negro", "Rojo"],
    descuento: "no aplica",
  },
];

const csp = ` 
  default-src 'self'; 
  script-src 'self' 'unsafe-inline'; 
  style-src 'self' 'unsafe-inline'; 
  img-src 'self' data:; 
  font-src 'self' data:; 
`;

function AccesorioEnfermeriaCard({ accesorio }) {
  return (
    <Col xs={6} lg={3}>
      <Card className="mb-4">
        {accesorio.descuento !== "no aplica" && (
          <div className="position-absolute top-0 start-0">
            <span className="badge bg-danger">{accesorio.descuento}</span>
          </div>
        )}
        <Card.Img variant="top" src={accesorio.imageUrl} />
        <Card.Body>
          <Card.Title>{accesorio.nombre}</Card.Title>
          <Card.Text>Categoría: {accesorio.categoria}</Card.Text>
          <Card.Text>Tipos: {accesorio.tipos.join(", ")}</Card.Text>
          <Card.Text>Colores: {accesorio.colores.join(", ")}</Card.Text>
          <Card.Text className="fs-5" style={{ color: "#0171fa" }}>
            {accesorio.precio}
          </Card.Text>
          <button
            className="btn color"
            style={{ color: "white", background: "#daa232" }}
          >
            Ver más
          </button>
        </Card.Body>
      </Card>
    </Col>
  );
}

function Accesorios() {
  const [selectedType, setSelectedType] = useState(""); // Estado para el tipo seleccionado
  const [selectedColor, setSelectedColor] = useState(""); // Estado para el color seleccionado
  const [priceRange, setPriceRange] = useState([0, 20]); // Rango de precios
  const minPrice = 0;
  const maxPrice = 20;

  // Función para aplicar filtros de tipo y color
  const accesoriosFiltrados = accesoriosEnfermeria.filter((accesorio) => {
    if (selectedType && !accesorio.tipos.includes(selectedType)) {
      return false;
    }
    if (selectedColor && !accesorio.colores.includes(selectedColor)) {
      return false;
    }
    return true;
  });

  const handlePriceRangeChange = (event) => {
    const value = event.target.value.split(",").map(parseFloat);
    setPriceRange(value);
  };

  return (
    <Container>
      <div className="flex container mx-auto justify-center">
        <Breadcrumb path={"Accesorios"} />
      </div>
      <Row>
        <Col lg={3}>
          <div className="mb-4">
            <h5>Filtrar por Tipo</h5>
            <select
              className="form-select"
              onChange={(e) => setSelectedType(e.target.value)}
              value={selectedType}
            >
              <option value="">Todos</option>
              <option value="Estetoscopio">Estetoscopio</option>
              <option value="Tijeras Médicas">Tijeras Médicas</option>
              {/* Agrega más tipos según sea necesario */}
            </select>
          </div>
          <div className="mb-4">
            <h5>Filtrar por Color</h5>
            <select
              className="form-select"
              onChange={(e) => setSelectedColor(e.target.value)}
              value={selectedColor}
            >
              <option value="">Todos</option>
              <option value="Blanco">Blanco</option>
              <option value="Azul">Azul</option>
              {/* Agrega más colores según sea necesario */}
            </select>
          </div>
          <div className="mb-4">
            <h5>Filtrar por Precio</h5>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange.join(",")}
              className="form-range"
              onChange={handlePriceRangeChange}
            />
            <div>
              Precios: ${priceRange[0]} - ${priceRange[1]}
            </div>
          </div>
        </Col>
        <Col lg={9}>
          <Row xs={2} md={4}>
            {accesoriosFiltrados.map((accesorio) => (
              <AccesorioEnfermeriaCard
                key={accesorio.id}
                accesorio={accesorio}
              />
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Accesorios;
