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
  const [isOnline, setIsOnline] = useState(navigator.onLine); // Para gestionar la conexión
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
        localStorage.setItem('products', JSON.stringify(data)); // Guardar en localStorage
      } catch (error) {
        console.error("Error al hacer la solicitud:", error);
        setIsLoading(false);
      }
    };

    if (isOnline) {
      fetchProducts(); // Cargar productos si hay conexión
    } else {
      const storedProducts = localStorage.getItem('products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts)); // Cargar desde localStorage si no hay conexión
        setIsLoading(false);
      }
    }

    // Escuchar cambios en la conexión
    const handleConnectionChange = () => {
      setIsOnline(navigator.onLine);
      if (navigator.onLine) {
        fetchProducts(); // Actualizar productos cuando vuelva la conexión
      }
    };

    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, [categoriaId, isOnline]);

  if (isLoading) {
    return <div className="text-center">Cargando...</div>;
  }

  return (
    <div className="container-related-products mb-2">
      <h2 className="text-center display-6">Uniformes</h2>
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
                  <p className=""><i className="fa fa-solid fa-tag"></i>{product.categoria.nombre}</p>
                  <p className=""> <i className="fa fa-thin fa-user"></i> {product.sexo}</p>
                </div>
                <div className="price">${product.precio}</div>
              </div>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default UniformesDestacados;
