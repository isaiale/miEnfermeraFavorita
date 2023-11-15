import React from 'react';
import NavbarUsuario from '../../componentes/navbarUsuario';
import TerminosCondiciones from '../../componentes/terminosYCondiciones';
import Footer from '../../componentes/footer';

function TerminosYCondiciones () {
  return (
    <div>
        <NavbarUsuario/>
        <TerminosCondiciones />
        <Footer/>  
    </div>
  )
}

export default TerminosYCondiciones;