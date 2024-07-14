import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button, Pagination } from "react-bootstrap";
import Breadcrumb from "../utilidad/migapan";
import Swal from "sweetalert2";
import { Productos_Renta } from "../url/urlSitioWeb";
import { Link } from "react-router-dom";
import "../css/colores.css";
import '../css/spinner.css';
import '../css/productos.css';

function ProductoRentaCard({ producto }) {
  return (
    <Col xs={6} lg={3}>
      <section className="container-related-products">
        <Card className="mb-4 card" key={producto._id}>
          {producto.descuento > 0 && (
            <div className="discount-icon"><i className="fa fa-ticket"></i> {producto.descuento}%</div>
          )}
          <div className="card-img">
            {producto.imagenes.length > 0 && (
              <img className="imagen" src={producto.imagenes[0].url} alt="" />
            )}
          </div>
          <div className="info-card">
            <div className="text-product">
              <h3>{producto.nombre}</h3>
              <p className="category"><i className="fa fa-solid fa-tag"></i> Productos de Renta</p>
            </div>
            <div className="precio">${producto.precio}</div>
          </div>
          <div className="me-1 ms-1">
            <Link className="text-decoration-none btnvermas" to={`/ProductoDetalleRenta/${producto._id}`} >
              Ver más
            </Link>
          </div>
        </Card>
      </section>
    </Col>
  );
}

function ProductosRenta() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]); // Rango de precios
  const [onlyDiscount, setOnlyDiscount] = useState(false); // Estado para filtrar solo productos con descuento
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const [itemsPerPage] = useState(8); // Estado para la cantidad de ítems por página
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

  const fetchProductosRenta = async () => {
    try {
      const response = await fetch(Productos_Renta);
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue exitosa.');
      }
      const jsonData = await response.json();
      setData(jsonData);
      setFilteredData(jsonData);
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

  useEffect(() => {
    applyFilters();
  }, [priceRange, onlyDiscount, searchTerm]);

  const applyFilters = () => {
    let filtered = data;

    filtered = filtered.filter(item => item.precio >= priceRange[0] && item.precio <= priceRange[1]);

    if (onlyDiscount) {
      filtered = filtered.filter(item => item.descuento > 0);
    }

    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.nombre.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.descripcion.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset page number when filters change
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prevRange => {
      if (name === "min") {
        return [Number(value), prevRange[1]];
      } else {
        return [prevRange[0], Number(value)];
      }
    });
  };

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setOnlyDiscount(false);
    setSearchTerm("");
    setFilteredData(data);
  };

  // Logic for displaying current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <div className="flex container mx-auto justify-center">
        <Breadcrumb path={"Productos de Renta"} />
      </div>
      <Row>
        <Col lg={3}>
          <div className="mb-4">
            <h5>Buscar por Nombre o Descripción</h5>
            <input
              type="text"
              className="form-control"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <h5>Filtrar por Precio</h5>
            <div className="d-flex">
              <input
                type="number"
                className="form-control me-2"
                name="min"
                value={priceRange[0]}
                onChange={handlePriceRangeChange}
                placeholder="Min"
              />
              <input
                type="number"
                className="form-control"
                name="max"
                value={priceRange[1]}
                onChange={handlePriceRangeChange}
                placeholder="Max"
              />
            </div>
            <div>
              Precio: ${priceRange[0]} - ${priceRange[1]}
            </div>
          </div>
          <div className="mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={onlyDiscount}
                onChange={(e) => setOnlyDiscount(e.target.checked)}
              />
              <label className="form-check-label">
                Solo con descuento
              </label>
            </div>
          </div>
          <div className="mb-4">
            <Button onClick={resetFilters} className="btn btn-secondary w-100">
              Limpiar Filtros
            </Button>
          </div>
        </Col>

        <Col lg={9}>
          {isLoading ? (
            <div className='mt-5 mb-5'>
              <p className='name-spinner mt-5'>Cargando...</p>
              <div className="spinner mb-5"></div>
            </div>
          ) : (
            <Row xs={2} md={4}>
              {currentItems.map((producto) => (
                <ProductoRentaCard
                  key={producto._id}
                  producto={producto}
                />
              ))}
            </Row>
          )}
          <Pagination className="mt-3">
            {pageNumbers.map(number => (
              <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                {number}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductosRenta;
