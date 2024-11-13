import NavbarUsuario from '../componentes/navbarUsuario';
import Footer from '../componentes/footer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Verificar_Pago, Stripe } from '../url/urlSitioWeb';
import SatisfaccionUsuario from '../componentes/satisfaccionUsuario';

const Success = () => {
  const location = useLocation();
  const history = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');

  const [status, setStatus] = useState('Verificando...');
  const [backgroundColor, setBackgroundColor] = useState('lightgray');
  const [showRating, setShowRating] = useState(false); // Estado para mostrar SatisfaccionUsuario

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Verificar el pago en ambas APIs
        const responsePago = await fetch(`${Verificar_Pago}${sessionId}`);
        const dataPago = await responsePago.json();

        const responseOtraAPI = await fetch(`${Stripe}/verify-payment/${sessionId}`);
        const dataOtraAPI = await responseOtraAPI.json();

        // Procesar la respuesta
        if (dataPago.status === 'completado' && dataOtraAPI.status) {
          setStatus('¡El pago se realizó con éxito y fue verificado por ambas fuentes!');
          setBackgroundColor('lightgreen');
          setShowRating(true); // Mostrar el componente de calificación
        } else if (dataPago.status === 'fallido' || dataOtraAPI.status === 'fallido') {
          setStatus('Pago Fallido');
          setBackgroundColor('lightcoral');
        } else {
          setStatus('Estado de pago no claro, por favor contacta soporte.');
          setBackgroundColor('yellow');
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

  const handleCloseRating = () => {
    setShowRating(false); // Oculta el componente de calificación
    history('/'); // Redirige al inicio
  };

  return (
    <div>
      <>
        <NavbarUsuario />
        {showRating ? (
          // Mostrar solo el componente de calificación cuando el pago sea exitoso
          <SatisfaccionUsuario onClose={handleCloseRating} />
        ) : (
          // Mostrar contenido principal si no se muestra la calificación
          <div className='mt-5 mb-5 m-5'>
            <div className='mt-5 mb-5' style={{ backgroundColor, padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
              <div className='mt-5 mb-5'>
                <h2>{status}</h2>
                <Link className='fs-5 text-dark' to='/'>Ir a Inicio</Link>
              </div>
            </div>
          </div>
        )}
        <Footer />
      </>
    </div>
  );
};

export default Success;
