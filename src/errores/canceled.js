import React, { useEffect, useState } from 'react';
import NavbarUsuario from '../componentes/navbarUsuario';
import Footer from '../componentes/footer';
import { Link, useLocation } from 'react-router-dom';
import { pagos_Cancelados_Renta, Stripe } from '../url/urlSitioWeb'; // Importa las URLs de ambas APIs

const Cancelado = () => {
  const location = useLocation();
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [extraInfo, setExtraInfo] = useState(null); // Estado adicional para la segunda API

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session_id');

    if (sessionId) {
      // Primera API: Verificar estado de cancelación de pagos (API 1)
      fetch(`${pagos_Cancelados_Renta}${sessionId}`)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'cancelado') {
            setStatus('cancelado');
          } else {
            setStatus('error');
            console.log('Error al cancelar la operación:', data);
          }
          // Después de procesar la primera API, llamamos a la segunda API (Stripe)
          return fetch(`${Stripe}/cancelado/${sessionId}`);
        })
        .then(response => response.json())
        .then(data => {
          // Procesar la respuesta de la segunda API
          if (data.status) { // Modifica "someField" según la respuesta de Stripe
            setExtraInfo('Información adicional obtenida de Stripe');
          } else {
            setExtraInfo('No se encontró información adicional en Stripe');
          }
        })
        .catch(error => {
          setStatus('error');
          setError(error);
          console.log('Error al comunicar con el servidor:', error);
        });
    }
  }, [location]);

  let mensaje;
  if (status === 'cancelado') {
    mensaje = '¡Operación cancelada!';
  } else if (status === 'error') {
    mensaje = 'Error al cancelar la operación. Por favor, inténtelo de nuevo.';
  } else {
    mensaje = 'Procesando la cancelación...';
  }

  return (
    <div>
      <NavbarUsuario />
      <div className='m-5'>
        <div className='mt-5 mb-5' style={{ backgroundColor: 'lightcoral', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
          <h2>¡Cancelado!</h2>
          <p>{mensaje}</p>
          {extraInfo && <p>{extraInfo}</p>} {/* Mostrar información de la segunda API */}
          {error && <p style={{ color: 'red' }}>Detalles del error: {error.message}</p>}
          <Link className='fs-5 text-dark' to='/'>Ir a Inicio</Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cancelado;
