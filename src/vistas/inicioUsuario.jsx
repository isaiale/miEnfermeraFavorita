import React from 'react';
import NavbarUsuario from '../componentes/navbarUsuario';
import EncabezadoUser from '../componentes/encabezadoUsuario';
import Footer from "../componentes/footer";


export const inicioUsuario = () => {
  return (
    <div>
        <NavbarUsuario/>
        <EncabezadoUser/>
        <Footer/>

    </div>
  )
}
