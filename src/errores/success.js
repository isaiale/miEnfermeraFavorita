import NavbarUsuario from '../componentes/navbarUsuario';
import Footer from '../componentes/footer';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div>
      <NavbarUsuario />
      <div className='m-5'>
        <div className='mt-5 mb-5' style={{ backgroundColor: 'lightgreen', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
          <h2>¡El pago se realizó con éxito!</h2>
          <p>Gracias por tu compra. </p>
          <Link className='fs-5 text-dark' to='/'>Ir a Inicio</Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Success;
