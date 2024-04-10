import NavbarUsuario from '../componentes/navbarUsuario';
import Footer from '../componentes/footer';
import { Link } from 'react-router-dom';
// import '../css/carritoCompras.css'

const Cancelado = () => {
  return (
    <div>
      <NavbarUsuario />
      <div className='m-5'>
        <div className='mt-5 mb-5' style={{ backgroundColor: 'lightcoral', padding: '10px', borderRadius: '5px', textAlign: 'center' }}>
          <h2>¡Cancelado!</h2>
          <p>¡Operación cancelada!</p>
          <Link className='fs-5 text-dark' to='/'>Ir a Inicio</Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Cancelado;
