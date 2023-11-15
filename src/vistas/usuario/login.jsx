import React from 'react';
import NavbarUsuario from '../../componentes/navbarUsuario';
import Footer from '../../componentes/footer';
import Login from '../../componentes/login';

const login = () => {
    return (
        <div>
            <NavbarUsuario />
            <Login />
            <Footer />
        </div>
    )
}

export default login