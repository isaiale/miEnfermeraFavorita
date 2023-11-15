import React from 'react'
import NavbarUsuario from '../../componentes/navbarUsuario';
import Footer from '../../componentes/footer';
import RegistroUsuario from '../../componentes/registroUsuario';


const registroUser = () => {
    return (
        <div>
            <NavbarUsuario />
            <RegistroUsuario />
            <Footer />
        </div>
    )
}

export default registroUser
