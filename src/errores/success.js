import NavbarUsuario from '../componentes/navbarUsuario';
import Footer from '../componentes/footer';
import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Verificar_Pago, Stripe } from '../url/urlSitioWeb'; // Importa las dos URLs de las APIs

const Success = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');
  const [status, setStatus] = useState('Verificando...');
  const [backgroundColor, setBackgroundColor] = useState('lightgray');

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Llamar a la primera API para verificar el pago
        const responsePago = await fetch(`${Verificar_Pago}${sessionId}`);
        const dataPago = await responsePago.json();

        // Llamar a la segunda API para obtener información adicional
        const responseOtraAPI = await fetch(`${Stripe}/verify-payment/${sessionId}`);
        const dataOtraAPI = await responseOtraAPI.json();

        // Procesar las respuestas de ambas APIs
        if (dataPago.status === 'completado' && dataOtraAPI.status) {
          setStatus('¡El pago se realizó con éxito y fue verificado por ambas fuentes!');
          setBackgroundColor('lightgreen');
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



// import NavbarUsuario from '../componentes/navbarUsuario';
// import Footer from '../componentes/footer';
// import { Link, useLocation } from 'react-router-dom';
// import React, { useEffect, useState } from 'react';
// import { Verificar_Pago } from '../url/urlSitioWeb';

// const Success = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const sessionId = queryParams.get('session_id');
//   const [status, setStatus] = useState('Verificando...');
//   const [backgroundColor, setBackgroundColor] = useState('lightgray');

//   useEffect(() => {
//     const verifyPayment = async () => {
//       try {
//         const response = await fetch(`${Verificar_Pago}${sessionId}`);
//         const data = await response.json();
//         if (data.status === 'completado') {
//           setStatus('¡El pago se realizó con éxito!');
//           setBackgroundColor('lightgreen');
//         } else {
//           setStatus('Pago Fallido');
//           setBackgroundColor('lightcoral');
//         }
//       } catch (error) {
//         setStatus('Error al verificar el pago');
//         setBackgroundColor('lightcoral');
//       }
//     };

//     if (sessionId) {
//       verifyPayment();
//     }
//   }, [sessionId]);

//   return (
//     <div>
//       <NavbarUsuario />
//       <div className='mt-5 mb-5 m-5'>
//         <div className='mt-5 mb-5' style={{ backgroundColor, padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
//           <div className='mt-5 mb-5'>
//             <h2>{status}</h2>
//             <Link className='fs-5 text-dark' to='/'>Ir a Inicio</Link>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default Success;
