import AvisoPrivacidad from "../componentes/avisoPrivacidad";
import React from 'react'
import NavbarUsuario from "../componentes/navbarUsuario";
import Footer from "../componentes/footer";

export const avisoPrivacidad = () => {
  return (
    <div>
        <NavbarUsuario/>
        <AvisoPrivacidad/>
        <Footer/>

    </div>
  )
}
