import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import imgUnifrmes from '../img/imagenProductoAtuendo.jpg';
import imgUnifrmes2 from '../img/imagenProductoAtuendo2.jpg';
import imgUnifrmes3 from '../img/imagenProductoAtuendo.jpg';
import imgUnifrmes4 from '../img/imagenProductoAtuendoss.jpg';
import imgUnifrmes5 from '../img/imagenProductoAtuendo.jpg';
import imgUnifrmes6 from '../img/imagenProductoAtuendoss.jpg';
import "../css/vistaDeUniformesInicio.css";
import { Link } from "react-router-dom";

const products = [
  {
    id: 1,
    categoriaUniformes: "uniforme",
    name: "Filipina Luisa para Dama",
    description: "Descripción ",
    price: "19.99",
    imageUrl: imgUnifrmes,
  },
  {
    id: 2,
    categoriaUniformes: "uniforme",
    name: "Filipina Luisa para Dama",
    description: "Descripción",
    price: "24.99",
    imageUrl: imgUnifrmes2,
  },
  {
    id: 3,
    categoriaUniformes: "uniforme",
    name: "Filipina Luisa para Dama",
    description: "Descripción",
    price: "19.99",
    imageUrl: imgUnifrmes3,
  },
  {
    id: 4,
    categoriaUniformes: "uniforme",
    name: "Filipina Luisa para Dama",
    description: "Descripción ",
    price: "19.99",
    imageUrl: imgUnifrmes4,
  },
  {
    id: 5,
    categoriaUniformes: "uniforme",
    name: "Filipina Luisa para Dama",
    description: "Descripción",
    price: "24.99",
    imageUrl: imgUnifrmes5,
  },
  {
    id: 6,
    categoriaUniformes: "uniforme",
    name: "Filipina Luisa para Dama",
    description: "Descripción",
    price: "19.99",
    imageUrl: imgUnifrmes6,
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

const UniformesDestacados = () => {
  return (
    <div className="contentoruniformes ">
      <h4 className="text-center display-6 ">Los mejores uniformes</h4>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlaySpeed={1000}
        transitionDuration={500}
      >
        {products.map((product) => (
          <Link to="/prueba" key={product.id} className="contentUniform">
            <div className="imgproducto">
              <img src={product.imageUrl} alt={product.name} />
            </div>
            <div className="descProducto">
              <h4 className="lead">{product.name}</h4>
              <p className="lead">$ {product.price}</p>
              <div className="d-grid mx-auto">
                <button className="btnvermas">Ver más</button>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default UniformesDestacados;
