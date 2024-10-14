import React, { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Link } from 'react-router-dom';
import { CategoriaProducto } from '../url/urlSitioWeb';
import '../css/categoria.css';
import '../css/colores.css';

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
  const [categorias, setCategorias] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine); // Estado para la conexión

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await fetch(CategoriaProducto);
        if (!response.ok) {
          throw new Error('La respuesta de la red no fue exitosa.');
        }
        const data = await response.json();
        setCategorias(data);
        localStorage.setItem('categorias', JSON.stringify(data)); // Guardar las categorías en localStorage
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
      }
    };

    if (isOnline) {
      fetchCategorias(); // Solo hace la solicitud si está en línea
    } else {
      const storedCategorias = localStorage.getItem('categorias');
      if (storedCategorias) {
        setCategorias(JSON.parse(storedCategorias)); // Si está offline, cargar desde localStorage
      }
    }

    // Escuchar cambios de conexión
    const handleConnectionChange = () => {
      setIsOnline(navigator.onLine);
      if (navigator.onLine) {
        fetchCategorias(); // Actualizar categorías cuando vuelva la conexión
      }
    };

    window.addEventListener('online', handleConnectionChange);
    window.addEventListener('offline', handleConnectionChange);

    return () => {
      window.removeEventListener('online', handleConnectionChange);
      window.removeEventListener('offline', handleConnectionChange);
    };
  }, [isOnline]);

  return (
    <>
      <div className='text-center mt-2'>
        <h4 className='display-6'>Categorías</h4>
      </div>
      <Carousel responsive={responsive} infinite={true} autoPlaySpeed={1000} transitionDuration={500} arrows={false}>
        {categorias.map((categoria, index) => (
          <Link key={index} to={`/productos/${categoria._id}`} className='link-no-underline'>
            <div className='content-categoria'>              
              <div className='description'>
                <h6 className='lead text-description-categoria'><i className="fa fa-solid fa-tag"></i> {categoria.nombre}</h6>
              </div>
            </div>
          </Link>
        ))}
        <Link to={`/accesorioss`} className='link-no-underline'>
          <div className='content-categoria'>
            <div className='description'>
              <h6 className='lead text-description-categoria'><i className="fa fa-solid fa-tag"></i> Accesorios</h6>
            </div>
          </div>
        </Link>
      </Carousel>
    </>
  );
};

export default TuComponente;
