import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Modal, Button } from 'react-bootstrap';
import imagenProducto from '../img/imagenProductoAtuendo.jpg';
import imagenProducto2 from '../img/batas.png';
import imagenProducto3 from '../img/imagenProductoAtuendo2.jpg';
import '../css/colores.css';


const products = [
  {
    id: 1,
    name: 'Producto 1',
    category: 'Filipina',
    descripcion: 'buen tipo de producto',
    price: '10.99',
    imageUrl: imagenProducto,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Azul', 'Rojo', 'Verde'],
    descuento: "50%",
  },
  {
    id: 2,
    name: 'Producto 2',
    category: 'Filipina',
    descripcion: 'buen tipo de producto',
    price: '15.99',
    imageUrl: imagenProducto2,
    sizes: ['M', 'L'],
    colors: ['Azul', 'Rojo'],
    descuento: "no aplica",
  },
  {
    id: 3,
    name: 'Producto 3',
    category: 'Filipina',
    descripcion: 'buen tipo de producto',
    price: '15.99',
    imageUrl: imagenProducto3,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Azul', 'Verde'],
    descuento: "10%",
  },
  {
    id: 4,
    name: 'Producto 4',
    category: 'Filipina',
    descripcion: 'buen tipo de producto',
    price: '15.99',
    imageUrl: imagenProducto,
    sizes: ['S', 'L', 'XL'],
    colors: ['Rojo', 'Verde'],
    descuento: "no aplica",
  }
];

function ProductCard({ product }) {
  const [showModal, setShowModal] = useState(false);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <Col xs={6} lg={3}>
      <Card className="mb-4 text-center">
        {product.descuento !== "no aplica" && (
          <div className='position-absolute top-0 start-0'>
            <span className='badge bg-danger'>{product.descuento}</span>
          </div>
        )}
        <img variant="top" src={product.imageUrl} className='card-img-top' height='250px' />
        <Card.Body>
          <h5 className="card-title mb-0">{product.name}</h5>
          {/*<Card.Text>color: {product.colors}</Card.Text>
          <Card.Text>tallas: {product.sizes}</Card.Text>*/}
          <p className="card-text lead fw-bold">
            {product.price}
          </p>
          <button className='btn' style={{ color: 'white', background: '#daa232' }} onClick={handleShow}>
            Ver más
          </button>
        </Card.Body>

        {/* Modal */}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{product.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="col-md-6">
              <img src={product.imageUrl} height='400px' width='400px' />
            </div>
            <div className="col-md-5">
              <h4 className="text-uppercase text-black">{product.category}</h4>
              <h1 className="display-5">{product.title}</h1>
              <h3 className="display-6 fw-bold my-4">${product.price}.</h3>
              <p className="lead">{product.descripcion}</p>
              <div className="d-grid mx-auto">
                <Button variant='' style={{ color: 'white', background: '#daa232' }} className="mb-2">
                  Comprar
                </Button>
                <button className='btn btn-outline-dark'>
                  Agregar al carrito
                </button>
              </div>

            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Card>
    </Col>
  );
}

function Productos() {
  const [selectedSize, setSelectedSize] = useState(''); // Estado para la talla seleccionada
  const [selectedDescuento, setSelectedDescuento] = useState(''); // Estado para descuento
  const [uniqueDescuentos, setUniqueDescuentos] = useState([]); //Para que no se repitan los datos de descuento
  const [selectedColor, setSelectedColor] = useState(''); // Estado para el color seleccionado
  const [priceRange, setPriceRange] = useState([0, 50]); // Rango de precios
  const minPrice = 0;
  const maxPrice = 50;

  useEffect(() => {
    // Extraer descuentos únicos de los productos
    const descuentos = new Set(products.map((product) => product.descuento));
    setUniqueDescuentos(['', ...Array.from(descuentos)]);
  }, []);

  // Función para aplicar filtros de talla y color
  const filteredProducts = products.filter((product) => {
    if (selectedSize && !product.sizes.includes(selectedSize)) {
      return false;
    }
    if (selectedDescuento && !product.descuento.includes(selectedDescuento)) {
      return false;
    }
    if (selectedColor && !product.colors.includes(selectedColor)) {
      return false;
    }
    return true;
  });


  const handlePriceRangeChange = (event) => {
    const value = event.target.value.split(',').map(parseFloat);
    setPriceRange(value);
  };

  return (
    <Container>
      <Row>
        <Col lg={3}>
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
            <h5>Filtrar por Precio</h5>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange.join(',')}
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
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Productos;
