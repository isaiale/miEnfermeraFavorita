import React, { useState } from 'react';
import { Card, Row, Col, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../img/Logo de mi enfermera favorita.jpg';
import batas from '../img/batas.png';
import chalecos from '../img/chaleco.png';
import '../css/categoria.css';

const categoriaProducto = [
  {
    image: batas,
    description: 'BATAS',
    to: '/productos',
  },
  {
    image: logo,
    description: 'CALZADOS',
    to: '/zapatos',
  },
  {
    image: chalecos,
    description: 'CHALECOS',
    to: '/chalecos',
  },
  {
    image: logo,
    description: 'FILIPINAS',
    to: '/filipina',
  },
  {
    image: logo,
    description: 'SACOS',
    to: '/sacos',
  },
  {
    image: logo,
    description: 'PANTALONES',
    to: '/pantalones',
  },
  {
    image: logo,
    description: 'SUETERES',
    to: '/sueteres',
  },
  {
    image: logo,
    description: 'SCRUBS',
    to: '/scrubs',
  },
];

const TuComponente = () => {
  const itemsPorSlide = 5;

  const totalSlides = Math.ceil(categoriaProducto.length / itemsPorSlide);
  const categoriasRepetidas = Array.from({ length: totalSlides * itemsPorSlide }, (_, index) => categoriaProducto[index % categoriaProducto.length]);

  return (
    <>
      <div className='text-center mt-2'>
          <h4>Categorías de uniformes</h4>
      </div>
      <Carousel className='carousel slider' interval={null} indicators={true}>
        {Array.from({ length: totalSlides }).map((_, indice) => (
          <Carousel.Item key={indice}>
            <div className='d-flex justify-content-center '> {/* Agrega una clase personalizada a la fila */}
              {categoriasRepetidas.slice(indice * itemsPorSlide, indice * itemsPorSlide + itemsPorSlide).map((ProductoCategoria, indiceInterno) => (
                <Col className='m-1' key={indiceInterno} xs={2} sm={2} md={2} lg={2} xl={15}>
                  <Link to={ProductoCategoria.to} className='link-no-underline'>
                  <Card className='text-center'>
                      <img className='d-block img-fluid w-100' src={ProductoCategoria.image} />
                      <div className='desdription'>
                        <h6 className='text-center mt-1'><span className='fw-bold letra'>{ProductoCategoria.description}</span></h6>
                      </div>
                    </Card>
                  </Link>
                </Col>
              ))}
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default TuComponente;
