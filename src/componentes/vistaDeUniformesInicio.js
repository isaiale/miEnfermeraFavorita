import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Card, Button } from 'react-bootstrap';
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

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 800 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 800, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const UniformesDestacados = () => {
  return (
    <div>
      <h4 className="text-center my-4">Los mejores uniformes</h4>
      <Carousel responsive={responsive} infinite={true} autoPlaySpeed={1000} transitionDuration={500}>
        {products.map((product) => (
          <Card key={product.id} className="mb-4 me-2 ms-2">
            <img variant="top" className='card-img-top' height='250px' src={product.imageUrl} alt={product.name} />
            <Card.Body>
              <div className='descripcionLetra'>
                <h1 className='tipoLetra '>{product.categoriaUniformes} {product.name}</h1>
                <p className="lead">${product.price}</p>
                <div className='d-grid mx-auto'>
                  <Button className='btn' style={{ color: 'white', background: '#daa232' }}>Ver más</Button>
                </div>
              </div>
            </Card.Body>
          </Card>
        ))}
      </Carousel>
    </div>
  );
};

export default UniformesDestacados;
