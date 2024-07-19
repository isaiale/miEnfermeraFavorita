import NavbarUsuario from '../componentes/navbarUsuario';
import Footer from '../componentes/footer';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Verificar_Pago } from '../url/urlSitioWeb';

const Success = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');
  const [status, setStatus] = useState('Verificando...');
  const [backgroundColor, setBackgroundColor] = useState('lightgray');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await fetch(`${Verificar_Pago}${sessionId}`);
        const data = await response.json();
        if (data.status === 'completado') {
          setStatus('¡El pago se realizó con éxito!');
          setBackgroundColor('lightgreen');
        } else {
          setStatus('Pago Fallido');
          setBackgroundColor('lightcoral');
        }
      } catch (error) {
        setStatus('Error al verificar el pago');
        setBackgroundColor('lightcoral');
      }
    };

    if (sessionId) {
      verifyPayment();
    }
  }, [sessionId]);

  return (
    <div>
      <NavbarUsuario />
      <div className='mt-5 mb-5 m-5'>
        <div className='mt-5 mb-5' style={{ backgroundColor, padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
          <div className='mt-5 mb-5'>
            <h2>{status}</h2>
            <Link className='fs-5 text-dark' to='/'>Ir a Inicio</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Success;
