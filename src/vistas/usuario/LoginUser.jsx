import React from 'react'
import NavbarUsuario from '../../componentes/navbarUsuario';
import Login from '../../componentes/login';
import Footer from '../../componentes/footer'; 

export const LoginUser = () => {
  return (
    <div>
        <NavbarUsuario/>
        <Login/>
        <Footer/>
    </div>
  )
}
