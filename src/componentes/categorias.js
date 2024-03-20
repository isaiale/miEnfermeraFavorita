import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../img/Logo de mi enfermera favorita.jpg';
import '../css/categoria.css';
import '../css/colores.css';

const categoriaProducto = [
  {
    image: logo,
    description: 'Batas',
    to: '/productos',
  },
  {
    image: logo,
    description: 'Calzado',
    to: '/zapatos',
  },
  {
    image: logo,
    description: 'Chalecos',
    to: '/chalecos',
  },
  {
    image: logo,
    description: 'Filipinas',
    to: '/filipina',
  },
  {
    image: logo,
    description: 'Sacos',
    to: '/sacos',
  },
  {
    image: logo,
    description: 'Pantalones',
    to: '/pantalones',
  },
  {
    image: logo,
    description: 'Sueter',
    to: '/sueteres',
  },
  {
    image: logo,
    description: 'Scrubs',
    to: '/scrubs',
  },
];

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3,
  },
};

const TuComponente = () => {
  return (
    <>
      <div className='text-center mt-2 '>
        <h4 className='display-6'>Categorías de uniformes</h4>
      </div>
      <Carousel responsive={responsive} infinite={true} autoPlaySpeed={1000} transitionDuration={500}>
        {categoriaProducto.map((ProductoCategoria, index) => (
          <Link key={index} to={ProductoCategoria.to} className='link-no-underline '>
            <div className='content'>
              <img className='d-block img-fluid w-100 ' src={ProductoCategoria.image} alt={ProductoCategoria.description} />
              <div className='desdription'>
                <h6 className='lead text-description-categoria'>{ProductoCategoria.description}</h6>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </>
  );
};

export default TuComponente;
