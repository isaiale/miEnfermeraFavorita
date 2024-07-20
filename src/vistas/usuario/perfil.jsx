import React from 'react'
import NavbarUsuario from '../../componentes/navbarUsuario';
import Footer from '../../componentes/footer'; 
import PerfilUser from '../../componentes/PerfilUser'

export const Perfil = () => {
  return (
    <div>
        <NavbarUsuario/>
        <PerfilUser/>
        <Footer/>
    </div>
  )
}
