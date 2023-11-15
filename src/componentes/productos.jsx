import React, { useState } from 'react';
import {Card, Container, Row, Col} from 'react-bootstrap';
import imagenProducto from '../img/imagenProductoAtuendo.jpg';
import '../css/colores.css';

const products = [
  {
    id: 1,
    name: 'Producto 1',
    category: 'Filipina',
    price: '$10.99',
    imageUrl: imagenProducto,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Azul', 'Rojo', 'Verde'],
    descuento: "50%",
  },
  {
    id: 2,
    name: 'Producto 2',
    category: 'Filipina',
    price: '$15.99',
    imageUrl: imagenProducto,
    sizes: ['M', 'L'],
    colors: ['Azul', 'Rojo'],
    descuento: "no aplica",
  },
  {
    id: 3,
    name: 'Producto 3',
    category: 'Filipina',
    price: '$15.99',
    imageUrl: imagenProducto,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Azul', 'Verde'],
    descuento: "10%",
  },
  {
    id: 4,
    name: 'Producto 4',
    category: 'Filipina',
    price: '$15.99',
    imageUrl: imagenProducto,
    sizes: ['S', 'L', 'XL'],
    colors: ['Rojo', 'Verde'],
    descuento: "no aplica",
  }
];

function ProductCard({ product }) {
  return (
    <Col xs={6} lg={3}>
      <Card className="mb-4">
        {product.descuento !== "no aplica" && (
          <div className='position-absolute top-0 start-0'>
            <span className='badge bg-danger'>{product.descuento}</span>
          </div>
        )}
        <Card.Img variant="top" src={product.imageUrl} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <Card.Text>Categoría: {product.category}</Card.Text>
          <Card.Text>color: {product.colors}</Card.Text>
          <Card.Text>tallas: {product.sizes}</Card.Text>
          <Card.Text className="fs-5" style={{ color: '#0171fa' }}>
            {product.price}
          </Card.Text>
          <button className='btn' style={{ color: 'white', background: '#daa232' }}>Ver más</button>
        </Card.Body>
      </Card>
    </Col>
  );
}

function Productos() {
  const [selectedSize, setSelectedSize] = useState(''); // Estado para la talla seleccionada
  const [selectedColor, setSelectedColor] = useState(''); // Estado para el color seleccionado
  const [priceRange, setPriceRange] = useState([0, 50]); // Rango de precios
  const minPrice = 0;
  const maxPrice = 50;

  // Función para aplicar filtros de talla y color
  const filteredProducts = products.filter((product) => {
    if (selectedSize && !product.sizes.includes(selectedSize)) {
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
