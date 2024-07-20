import React, { useState, useEffect } from "react";
import { Card, Container, Row, Col, Button, Pagination } from "react-bootstrap";
import Breadcrumb from "../utilidad/migapan";
import "../css/colores.css";
import Swal from "sweetalert2";
import { categoria_productos } from "../url/urlSitioWeb";
import { useParams, Link } from "react-router-dom";
import '../css/spinner.css';
import '../css/productos.css';

function AccesorioEnfermeriaCard({ accesorio, categoriaNombre }) {
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
              <div className="text-product">
                <h3>{accesorio.nombre}</h3>                
                <p className=""><i className="fa fa-solid fa-tag" ></i> {categoriaNombre}</p>                 
                <p className=""> <i className="fa fa-thin fa-user"></i> {accesorio.sexo}</p>
              </div>
              <div className="precio">${accesorio.precio}</div>
            </div>
          </Link>
        </Card>
      </section>
    </Col>
  );
}

function Productoss() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]); // Rango de precios
  const [onlyDiscount, setOnlyDiscount] = useState(false); // Estado para filtrar solo productos con descuento
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [selectedTalla, setSelectedTalla] = useState(""); // Estado para la talla seleccionada
  const [selectedSexo, setSelectedSexo] = useState(""); // Estado para el sexo seleccionado
  const [currentPage, setCurrentPage] = useState(1); // Estado para la página actual
  const [itemsPerPage] = useState(8); // Estado para la cantidad de ítems por página
  const { categoriaId } = useParams(); // Obtener el categoriaId de la URL
  const [categoriaNombre, setCategoriaNombre] = useState(""); // Estado para el nombre de la categoría
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga
  const [tallas, setTallas] = useState(['Ch', 'M', 'G', 'XL']); // Estado para las tallas disponibles

  const minPrice = 0;
  const maxPrice = 1000;

  const datosProducto = async () => {
    try {
      const response = await fetch(`${categoria_productos}${categoriaId}`);
      if (!response.ok) {
        throw new Error('La respuesta de la red no fue exitosa.');
      }
      const jsonData = await response.json();
      setData(jsonData);
      setFilteredData(jsonData);
      console.log(jsonData);
      setIsLoading(false); // Detener la carga después de obtener los datos

      // Obtener el nombre de la categoría
      if (jsonData.length > 0 && jsonData[0].categoria && jsonData[0].categoria.nombre) {
        setCategoriaNombre(jsonData[0].categoria.nombre);

        // Ajustar las tallas según la categoría
        if (jsonData[0].categoria.nombre === 'Pantalones') {
          setTallas(['28', '30', '32', '34', '36', '38']);
        } else {
          setTallas(['Ch', 'M', 'G', 'XL']);
        }
      }

    } catch (error) {
      Swal.fire({ title: "Error al hacer la solicitud.", icon: "error" });
      setIsLoading(false); // Detener la carga en caso de error
    }
  }

  useEffect(() => {
    datosProducto();
  }, [categoriaId]);

  useEffect(() => {
    applyFilters();
  }, [priceRange, onlyDiscount, searchTerm, selectedTalla, selectedSexo]);

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

    if (selectedTalla) {
      filtered = filtered.filter(item => item.talla && item.talla.includes(selectedTalla));
    }

    if (selectedSexo) {
      filtered = filtered.filter(item => item.sexo === selectedSexo);
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

  const handleTallaChange = (e) => {
    setSelectedTalla(e.target.value);
  };

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setOnlyDiscount(false);
    setSearchTerm("");
    setSelectedTalla("");
    setSelectedSexo("");
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
        <Breadcrumb path={categoriaNombre}/>
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
            <h5>Filtrar por Talla</h5>
            <select className="form-control" value={selectedTalla} onChange={handleTallaChange}>
              <option value="">Todas</option>
              {tallas.map(talla => (
                <option key={talla} value={talla}>{talla}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <h5>Filtrar por Sexo</h5>
            <select className="form-control" value={selectedSexo} onChange={(e) => setSelectedSexo(e.target.value)}>
              <option value="">Todos</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
              <option value="Unisex">Unisex</option>
            </select>
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
              {currentItems.map((accesorio) => (
                <AccesorioEnfermeriaCard
                  key={accesorio._id}
                  accesorio={accesorio}
                  categoriaNombre={categoriaNombre}
                />
              ))}
            </Row>
          )}
          <Pagination className="m-2">
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

export default Productoss;
