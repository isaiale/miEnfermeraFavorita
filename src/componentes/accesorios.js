import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button, Pagination } from "react-bootstrap";
import Breadcrumb from "../utilidad/migapan";
import { categoria_productos } from "../url/urlSitioWeb";
import { Link } from "react-router-dom";
import "../css/colores.css";
import '../css/spinner.css';
import '../css/productos.css';

function AccesorioEnfermeriaCard({ accesorio }) {
  return (
    <Col xs={6} lg={3}>
      <section className="container-related-products">
        <Card className="mb-4 card" key={accesorio._id}>
          <Link className="text-decoration-none" to={`/detalle-producto/${accesorio._id}`}>

            {accesorio.descuento > 0 && (
              <div className="discount-icon"><i className="fa fa-ticket"> </i> {accesorio.descuento}%</div>
            )}
            <div className="card-img">
              {accesorio.imagenes.length > 0 && (
                <img className="imagen" src={accesorio.imagenes[0].url} alt="" />
              )}
            </div>
            <div className="info-card">
              <div class="text-product">
                <h3>{accesorio.nombre}</h3>
                <p class="category"><i class="fa fa-solid fa-tag"></i> Accesorios</p>
              </div>
              <div class="precio">${accesorio.precio}</div>
            </div>

          </Link>
        </Card>

      </section>

    </Col>
  );
}

function Accesorios() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]); // Rango de precios
  const [onlyDiscount, setOnlyDiscount] = useState(false); // Estado para filtrar solo productos con descuento
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const [itemsPerPage] = useState(8); // Estado para la cantidad de ítems por página
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

  const minPrice = 0;
  const maxPrice = 1000;

  const datosProducto = async () => {
    try {
      const response = await fetch(`${categoria_productos}660e8da897d41d20a385ee4f`);
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue exitosa.');
      }
      const jsonData = await response.json();
      setData(jsonData);
      setFilteredData(jsonData);
      setIsLoading(false); // Detener la carga después de obtener los datos
    } catch (error) {
      setIsLoading(false); // Detener la carga en caso de error
    }
  }

  useEffect(() => {
    datosProducto();
  }, [])

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
        <Breadcrumb path={"Accesorios"} />
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
          ) : currentItems.length > 0 ? (
            <Row xs={2} md={4}>
              {currentItems.map((accesorio) => (
                <AccesorioEnfermeriaCard
                  key={accesorio._id}
                  accesorio={accesorio}
                />
              ))}
            </Row>
          ) : (
            <div className="text-center mt-4">
              <p>No hay productos disponibles.</p>
            </div>
          )}
          {filteredData.length > 0 && (
            <Pagination className="mt-3">
              {pageNumbers.map(number => (
                <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>
                  {number}
                </Pagination.Item>
              ))}
            </Pagination>
          )}
        </Col>

      </Row>
    </Container>
  );
}

export default Accesorios;
