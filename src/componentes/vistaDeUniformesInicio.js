import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import "../css/vistaDeUniformesInicio.css";
import "../css/productos.css";
import { categoria_productos } from "../url/urlSitioWeb";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

const UniformesDestacados = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const categoriaId = '661e80554fe28882b7029321'; // Reemplaza con el ID real

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${categoria_productos}${categoriaId}`);
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue exitosa.');
        }
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoriaId]);

  if (isLoading) {
    return <div className="text-center">Cargando...</div>;
  }

  return (
    <div className="container-related-products mb-2">
      <h2 className="text-center display-6">Productos Relacionados</h2>
      <Carousel
        responsive={responsive}
        infinite={true}
        autoPlaySpeed={1000}
        transitionDuration={500}
        arrows={false}
      >
        {products.map((product) => (
          <div className="card m-2" key={product._id}>
            <Link className="text-decoration-none" to={`/detalle-producto/${product._id}`}>
              {product.descuento > 0 && (
                <div className="discount-icon">
                  <i className="fa fa-ticket"></i> {product.descuento}%
                </div>
              )}
              <div className="card-imgVistaInicio">
                {product.imagenes.length > 0 && (
                  <img className="imagenVistaInicio" src={product.imagenes[0].url} alt={product.nombre} />
                )}
              </div>
              <div className="info-card">
                <div className="text-product">
                  <h3>{product.nombre}</h3>
                  <p className=""><i className="fa fa-solid fa-tag"></i> Productos de Renta</p>
                  <p className=""> <i className="fa fa-thin fa-user"></i> {product.sexo}</p>
                </div>
                <div className="price">${product.precio}</div>
              </div>
              {/* <div className="me-1 ms-1">
              <Link className="text-decoration-none btnvermas" to={`/detalle-producto/${product._id}`}>
                Ver más
              </Link>
            </div> */}
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default UniformesDestacados;
