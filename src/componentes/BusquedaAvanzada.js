import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Modal, Button, Form, Alert } from 'react-bootstrap';
import accesoriosData from "../autenticar/accesorio.json";
import productosData from "../autenticar/productos.json";
import pruebas from "../img/prueba.jpg";

const BusquedaAvanzada = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSize, setSelectedSize] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [selectedDescuento, setSelectedDescuento] = useState('');
    const [priceRange, setPriceRange] = useState([0, 50]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [uniqueDescuentos, setUniqueDescuentos] = useState([]);

    useEffect(() => {
        // Combinar accesorios y productos en un solo array
        const combinedItems = [...accesoriosData.accesorios, ...productosData.productos];

        // Extraer descuentos únicos de los productos
        const descuentos = new Set(combinedItems.map((item) => item.descuento));
        setUniqueDescuentos(['', ...Array.from(descuentos)]);

        // Aplicar filtros cuando cambian los valores de los estados
        const filtered = combinedItems.filter((item) =>
            item.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedSize ? item.sizes?.includes(selectedSize) : true) &&
            (selectedColor ? item.colors?.includes(selectedColor) : true) &&
            (selectedDescuento ? item.descuento === selectedDescuento : true) &&
            item.price >= priceRange[0] &&
            item.price <= priceRange[1]
        );

        setFilteredItems(filtered);
    }, [searchTerm, selectedSize, selectedColor, selectedDescuento, priceRange]);

    const handleShow = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const handleClose = () => {
        setSelectedItem(null);
        setShowModal(false);
    };

    const handlePriceRangeChange = (event) => {
        const value = event.target.value.split(',').map(parseFloat);
        setPriceRange(value);
    };

    return (
        <Container>
            <Form className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </Form>

            <Row>
                <Col lg={3}>
                    {/* Filtros adicionales aquí, por ejemplo, talla, color, descuento, precio */}
                    <div className="mb-4">
                        <h5>Filtrar por Descuento</h5>
                        <select
                            className="form-select"
                            onChange={(e) => setSelectedDescuento(e.target.value)}
                            value={selectedDescuento}
                        >
                            {uniqueDescuentos.map((descuento, index) => (
                                <option key={index} value={descuento}>
                                    {descuento === '' ? 'Todos' : descuento}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <h5>Filtrar por Talla</h5>
                        <select
                            className="form-select"
                            onChange={(e) => setSelectedSize(e.target.value)}
                            value={selectedSize}
                        >
                            <option value="">Todos</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
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
                            <option value="Azul">Azul</option>
                            <option value="Rojo">Rojo</option>
                            <option value="Verde">Verde</option>
                        </select>
                    </div>
                </Col>
                <Col lg={9}>
                    {searchTerm && filteredItems.length > 0 ? (
                        <Row xs={2} md={4}>
                            {filteredItems.map((item) => (
                                <Col key={item.id}>
                                    <Card className="mb-4 text-center">
                                        <img src={pruebas} className="card-img-top" alt={item.name} height="250px" />
                                        <Card.Body>
                                            <h5 className="card-title mb-0">{item.name}</h5>
                                            <p className="card-text lead fw-bold">${item.price}</p>
                                            <button
                                                className="btn"
                                                style={{ color: 'white', background: '#daa232' }}
                                                onClick={() => handleShow(item)}
                                            >
                                                Ver más
                                            </button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    ) : searchTerm && filteredItems.length === 0 ? (
                        <Alert variant="info">No se encontraron resultados con los filtros seleccionados.</Alert>
                    ) : null}
                </Col>
            </Row>

            {/* Modal */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedItem && selectedItem.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {selectedItem ? (
                        <>
                            <div className="col-md-6">
                                <img src={pruebas} height="400px" width="400px" alt={selectedItem.name} />
                            </div>
                            <div className="col-md-5">
                                <h4 className="text-uppercase text-black">{selectedItem.category}</h4>
                                <h1 className="display-5">{selectedItem.name}</h1>
                                <h3 className="display-6 fw-bold my-4">${selectedItem.price}</h3>
                                {/* Otros detalles del ítem */}
                                <div className="d-grid mx-auto">
                                    <Button variant="" style={{ color: 'white', background: '#daa232' }} className="mb-2">
                                        Comprar
                                    </Button>
                                    <button className="btn btn-outline-dark">Agregar al carrito</button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>No se ha seleccionado ningún ítem.</p>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cerrar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default BusquedaAvanzada;
