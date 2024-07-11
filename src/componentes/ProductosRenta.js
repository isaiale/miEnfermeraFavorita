import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col } from "react-bootstrap";
import Breadcrumb from "../utilidad/migapan";
import Swal from "sweetalert2";
import { Productos_Renta } from "../url/urlSitioWeb";
import { Link } from "react-router-dom";
import "../css/colores.css";
import '../css/spinner.css';

function ProductoRentaCard({ producto }) {
  return (
    <Col xs={6} lg={3}>
      <Card className="mb-4 contentoruniformes" key={producto._id}>
        <div className="imgproducto">
          {producto.imagenes.length > 0 && (
            <img src={producto.imagenes[0].url} alt={producto.nombre} />
          )}
        </div>
        <div className="descProducto">
          <h3 className="lead">{producto.nombre}</h3>
          <h4 className="lead">
            $ <span className="lead" style={{ color: "#0171fa" }}>{producto.precio}</span>
          </h4>
          <div className="ms-3 d-grid mx-auto">
            <Link to={`/ProductoDetalleRenta/${producto._id}`} className="btnvermas">
              Ver más
            </Link>
          </div>
        </div>
      </Card>
    </Col>
  );
}

function ProductosRenta() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

  const fetchProductosRenta = async () => {
    try {
      const response = await fetch(Productos_Renta);
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue exitosa.');
      }
      const jsonData = await response.json();
      setData(jsonData);
      setIsLoading(false); // Detener la carga después de obtener los datos
      console.log(jsonData);
    } catch (error) {
      Swal.fire({ title: "Error al hacer la solicitud.", icon: "error" });
      setIsLoading(false); // Detener la carga en caso de error
    }
  }

  useEffect(() => {
    fetchProductosRenta();
  }, []);

  return (
    <Container>
      <div className="flex container mx-auto justify-center">
        <Breadcrumb path={"Productos de Renta"} />
      </div>
      {isLoading ? (
        <div className='mt-5 mb-5'>
          <p className='name-spinner mt-5'>Cargando...</p>
          <div className="spinner mb-5"></div>
        </div>
      ) : (
        <Row>
          <Col lg={9}>
            <Row xs={2} md={4}>
              {data.map((producto) => (
                <ProductoRentaCard
                  key={producto._id}
                  producto={producto}
                />
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
}

export default ProductosRenta;
