import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import Breadcrumb from "../utilidad/migapan";
import "../css/colores.css";
import Swal from "sweetalert2";
import { Productos } from "../url/urlSitioWeb";
import { Link } from "react-router-dom";

function AccesorioEnfermeriaCard({ accesorio }) {
  return (
    <Col xs={6} lg={3}>
      <Card className="mb-4 contentoruniformes" key={accesorio._id}>
        {accesorio.descuento > 0 && (
          <div className="position-absolute top-0 start-0">
            <span className="badge bg-danger" title="Descuento">{accesorio.descuento} %</span>
          </div>
        )}
        <div className="imgproducto">
          {accesorio.imagenes.length > 0 && (
            <img src={accesorio.imagenes[0].url} alt="" />
          )}
        </div>
        <div className="descProducto">
          <h3 className="lead">{accesorio.nombre}</h3>
          {/* <p className="lead">Categoría: {accesorio.categoria.map((cat) => cat.nombre).join(", ")} </p> */}
          <h4 className="lead" >
            $ <span className="lead" style={{ color: "#0171fa" }}>{accesorio.precio}</span>
          </h4>
          <div className="ms-3 d-grid mx-auto">
            {/* <button className="btnvermas">Ver más</button> */}
            {/* <Link to={`/detalle-producto/${accesorio._id}`} className="btnvermas"> */}
            <Link to={`/detalle-producto/${accesorio._id}`} className="btnvermas">
              Ver más
            </Link>
          </div>
        </div>
      </Card>
    </Col>
  );
}

function Accesorios() {
  const [data, setData] = useState([]);
  const [selectedType, setSelectedType] = useState(""); // Estado para el tipo seleccionado
  const [selectedColor, setSelectedColor] = useState(""); // Estado para el color seleccionado
  const [priceRange, setPriceRange] = useState([0, 20]); // Rango de precios
  const minPrice = 0;
  const maxPrice = 20;

  const datosProducto = async () => {
    try {
      const response = await fetch(Productos);
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue exitosa.')
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      Swal.fire({ title: "Error al hacer la solicitud.", icon: "error" });
    }
  }

  useEffect(() => {
    datosProducto();
  }, [])

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
            //   onChange={(e) => setSelectedType(e.target.value)}
            //   value={selectedType}
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
            //   onChange={(e) => setSelectedColor(e.target.value)}
            //   value={selectedColor}
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
            //   onChange={handlePriceRangeChange}
            />
            <div>
              Precios: ${priceRange[0]} - ${priceRange[1]}
            </div>
          </div>
        </Col>

        <Col lg={9}>
          <Row xs={2} md={4}>
            {data.map((accesorio) => (
              <AccesorioEnfermeriaCard
                key={accesorio._id}
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
