import React from 'react';
import NavbarUsuario from '../../componentes/navbarUsuario';
import Footer from '../../componentes/footer';
import DetalleProducto from '../../componentes/detalleProductos';

export const ProductoDetalle = () => {
    return (
        <div>
            <NavbarUsuario />
            <DetalleProducto />
            <Footer />
        </div>
    )
}