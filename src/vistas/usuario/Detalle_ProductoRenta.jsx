import React from 'react';
import NavbarUsuario from '../../componentes/navbarUsuario';
import Footer from '../../componentes/footer';
import DetalleProductoRenta from '../../componentes/DetalleProductoRenta';

export const ProductoDetalleRenta = () => {
    return (
        <div>
            <NavbarUsuario />
            <DetalleProductoRenta />
            <Footer />
        </div>
    )
}