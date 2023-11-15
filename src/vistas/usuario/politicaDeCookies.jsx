import React from 'react';
import NavbarUsuario from '../../componentes/navbarUsuario';
import PoliticasdeCookies from '../../componentes/politicasdeCookies';
import Footer from '../../componentes/footer';

const PoliticaDeCookies = () => {
    return (
        <div>
            <NavbarUsuario />
            <PoliticasdeCookies />
            <Footer />
        </div>
    )
}

export default PoliticaDeCookies