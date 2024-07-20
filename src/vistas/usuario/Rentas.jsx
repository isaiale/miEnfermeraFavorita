import React from 'react'
import NavbarUsuario from '../../componentes/navbarUsuario';
import Footer from '../../componentes/footer';
import RentasUsuarios from '../../componentes/rentasUsuario';


const RentasUsuario = () => {
    return (
        <div>
            <NavbarUsuario />
            <RentasUsuarios />
            <Footer />
        </div>
    )
}

export default RentasUsuario
