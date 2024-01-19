import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import imgUnifrmes from '../img/imagenProductoAtuendo.jpg';
import imgUnifrmes2 from '../img/imagenProductoAtuendo2.jpg';
import imgUnifrmes3 from '../img/imagenProductoAtuendoss.jpg';
import '../css/vistaDeUniformesInicio.css';

const products = [
  {
    id: 1,
    categoriaUniformes: 'uniforme',
    name: 'Uniforme 1 de enfermera',
    description: 'Descripción ',
    price: '19.99',
    imageUrl: imgUnifrmes,
  },
  {
    id: 2,
    categoriaUniformes: 'uniforme',
    name: 'Uniforme 2',
    description: 'Descripción',
    price: '24.99',
    imageUrl: imgUnifrmes2,
  },
  {
    id: 3,
    categoriaUniformes: 'uniforme',
    name: 'Uniforme 3',
    description: 'Descripción',
    price: '19.99',
    imageUrl: imgUnifrmes3,
  },
  {
    id: 4,
    categoriaUniformes: 'uniforme',
    name: 'Uniforme 4',
    description: 'Descripción',
    price: '24.99',
    imageUrl: imgUnifrmes2,
  },
  {
    id: 5,
    categoriaUniformes: 'uniforme',
    name: 'Uniforme 5',
    description: 'Descripción',
    price: '19.99',
    imageUrl: imgUnifrmes,
  },
  {
    id: 6,
    categoriaUniformes: 'uniforme',
    name: 'Uniforme 6',
    description: 'Descripción',
    price: '24.99',
    imageUrl: imgUnifrmes2,
  },
  {
    id: 7,
    categoriaUniformes: 'uniforme',
    name: 'Uniforme ',
    description: 'Descripción',
    price: '24.99',
    imageUrl: imgUnifrmes2,
  }
];

const UniformesDestacados = () => {
  return (
    <Container>
      <h4 className="text-center my-4">Los mejores uniformes</h4>
      <Carousel interval={null} indicators={true}>
        {Array.from({ length: Math.ceil(products.length / 3) }).map((_, index) => (
          <Carousel.Item key={index}>
            <Row>
              {products.slice(index * 3, index * 3 + 3).map((product) => (
                <Col key={product.id} xs={4} md={4}>
                  <Card className="mb-4">
                    <Card.Img variant="top" src={product.imageUrl} />
                    <Card.Body>
                      <div className='descripcionLetra'>
                        <h1 className='tipoLetra'>{product.categoriaUniformes} {product.name}</h1>
                        <p className="fw-bold precio">${product.price}</p>
                        <div className='d-grid mx-auto'>
                          <button className='btn' style={{ color: 'white', background: '#daa232' }}>Ver más</button>
                        </div>
                        
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default UniformesDestacados;
