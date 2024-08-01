import React from 'react';
import NavbarUsuario from '../../componentes/navbarUsuario';
import Slider from '../../componentes/slider';
import CategoriasAtuendos from '../../componentes/categorias';
import UniformesDestacados from '../../componentes/vistaDeUniformesInicio';
// import Mapa1Map from '../../componentes/Mapa';
import ComentariosClientes from '../../componentes/ComentariosClientes';
import ProductosCalzado from '../../componentes/productosCalzado';
import Footer from "../../componentes/footer";


function InicioUsuario() {
  return (

    <div>
      <NavbarUsuario />
      <Slider />
      <CategoriasAtuendos />  
      {/* <Mapa1Map /> */}
      <ProductosCalzado />
      <UniformesDestacados />
           
      <ComentariosClientes/>
      <Footer />      
    </div>
  );
}
export default InicioUsuario;