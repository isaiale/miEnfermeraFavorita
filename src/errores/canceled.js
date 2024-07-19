import React, { useEffect, useState } from 'react';
import NavbarUsuario from '../componentes/navbarUsuario';
import Footer from '../componentes/footer';
import { Link, useLocation } from 'react-router-dom';
import { pagos_Cancelados_Renta } from '../url/urlSitioWeb';

const Cancelado = () => {
  const location = useLocation();
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sessionId = params.get('session_id');

    if (sessionId) {
      fetch(`${pagos_Cancelados_Renta}${sessionId}`)
        .then(response => response.json())
        .then(data => {
          if (data.status === 'cancelado') {
            setStatus('cancelado');
          } else {
            setStatus('error');
            console.log('Error al cancelar la operación:', data);
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
          {error && <p style={{ color: 'red' }}>Detalles del error: {error.message}</p>}
          <Link className='fs-5 text-dark' to='/'>Ir a Inicio</Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Cancelado;
