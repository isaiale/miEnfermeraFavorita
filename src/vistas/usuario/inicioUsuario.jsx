import React from 'react';
import NavbarUsuario from '../../componentes/navbarUsuario';
import Footer from "../../componentes/footer";
import Slider from '../../componentes/slider';
import CategoriasAtuendos from '../../componentes/categorias';
import UniformesDestacados from '../../componentes/vistaDeUniformesInicio';
import ComentariosClientes from '../../componentes/ComentariosClientes';
import ProductosCalzado from '../../componentes/productosCalzado';


function InicioUsuario() {
  return (

    <div>
      <NavbarUsuario />
      <Slider />
      <CategoriasAtuendos />  
      <ProductosCalzado />
      <UniformesDestacados />
      <ComentariosClientes/>
      <Footer />
    </div>
  );
}
export default InicioUsuario;