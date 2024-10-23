import React, { useState, useEffect, useCallback } from "react";
import { Card, Container, Row, Col, Button, Pagination } from "react-bootstrap";
import Breadcrumb from "../utilidad/migapan";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import '../css/colores.css';
import '../css/spinner.css';
import '../css/productos.css';

function AccesorioEnfermeriaCard({ accesorio }) {
  const categoriaNombre = accesorio.categoria && accesorio.categoria[0] ? accesorio.categoria[0].nombre : 'Rentas';

  let linkTo = `/detalle-producto/${accesorio._id}`;
  if (!categoriaNombre || categoriaNombre.toLowerCase() === 'rentas') {
    linkTo = `/ProductoDetalleRenta/${accesorio._id}`;
  }

  return (
    <Col xs={6} lg={3}>
      <section className="container-related-products">
        <Card className="mb-4 card" key={accesorio._id}>
          <Link className="text-decoration-none" to={linkTo}>
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
                <p className=""><i className="fa fa-solid fa-tag"></i> {categoriaNombre}</p>
                {categoriaNombre !== 'Accesorios' && (
                  <p className=""><i className="fa fa-thin fa-user"></i> {accesorio.sexo}</p>
                )}
              </div>
              <div className="precio">${accesorio.precio}</div>
            </div>
          </Link>
        </Card>
      </section>
    </Col>
  );
}

function BusquedaAvanzada() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [onlyDiscount, setOnlyDiscount] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTalla, setSelectedTalla] = useState("");
  const [selectedSexo, setSelectedSexo] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);
  const [categoriaNombre, setCategoriaNombre] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  /* const [tallas, setTallas] = useState(['Ch', 'M', 'G', 'XL']); */

  const datosProducto = async () => {
    try {
      const [response1, response2] = await Promise.all([
        fetch("https://back-end-enfermera.vercel.app/api/productos/productos"),
        fetch("https://back-end-enfermera.vercel.app/api/productos-renta")
      ]);

      if (!response1.ok || !response2.ok) {
        throw new Error('La respuesta de la red no fue exitosa.');
      }

      const jsonData1 = await response1.json();
      const jsonData2 = await response2.json();
      const combinedData = [...jsonData1, ...jsonData2];

      setData(combinedData);
      setFilteredData(combinedData);
      setIsLoading(false);

      if (combinedData.length > 0 && combinedData[0].categoria?.[0]?.nombre) {
        setCategoriaNombre(combinedData[0].categoria[0].nombre);
        /* setTallas(combinedData[0].categoria[0].nombre === 'Pantalones' ? ['28', '30', '32', '34', '36', '38'] : ['Ch', 'M', 'G', 'XL']); */
      }
    } catch (error) {
      Swal.fire({ title: "Error al hacer la solicitud.", icon: "error" });
      setIsLoading(false);
    }
  };

  const applyFilters = useCallback(() => {
    let filtered = data.filter(item => item.precio >= priceRange[0] && item.precio <= priceRange[1]);

    if (onlyDiscount) filtered = filtered.filter(item => item.descuento > 0);
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(item =>
        item.nombre.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.descripcion.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
    if (selectedTalla) filtered = filtered.filter(item => item.talla?.includes(selectedTalla));
    if (selectedSexo) filtered = filtered.filter(item => item.sexo === selectedSexo);

    setFilteredData(filtered);
    setCurrentPage(1);
  }, [data, priceRange, onlyDiscount, searchTerm, selectedTalla, selectedSexo]);

  useEffect(() => {
    datosProducto();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prevRange => name === "min" ? [Number(value), prevRange[1]] : [prevRange[0], Number(value)]);
  };

  const resetFilters = () => {
    setPriceRange([0, 1000]);
    setOnlyDiscount(false);
    setSearchTerm("");
    setSelectedTalla("");
    setSelectedSexo("");
    setFilteredData(data);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }, (_, i) => i + 1);

  return (
    <Container>
      <div className="flex container mx-auto justify-center">
        <Breadcrumb path={categoriaNombre} />
      </div>
      <Row>
        <Col lg={3}>
          <div className="mb-4">
            <h5>Buscar por Nombre o Descripción</h5>
            <input type="text" className="form-control" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="mb-4">
            <h5>Filtrar por Precio</h5>
            <div className="d-flex">
              <input type="number" className="form-control me-2" name="min" value={priceRange[0]} onChange={handlePriceRangeChange} placeholder="Min" />
              <input type="number" className="form-control" name="max" value={priceRange[1]} onChange={handlePriceRangeChange} placeholder="Max" />
            </div>
            <div>Precio: ${priceRange[0]} - ${priceRange[1]}</div>
          </div>
          <Button onClick={resetFilters} className="btn btn-secondary w-100">Limpiar Filtros</Button>
        </Col>
        <Col lg={9}>
          {isLoading ? (
            <div className='spinner-container'>Cargando...</div>
          ) : (
            <Row xs={2} md={4}>{currentItems.map(item => <AccesorioEnfermeriaCard key={item._id} accesorio={item} />)}</Row>
          )}
          <Pagination>{pageNumbers.map(number => <Pagination.Item key={number} active={number === currentPage} onClick={() => setCurrentPage(number)}>{number}</Pagination.Item>)}</Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default BusquedaAvanzada;
