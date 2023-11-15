import React from 'react';
import NavbarUsuario from '../../componentes/navbarUsuario';
//import EncabezadoUser from '../../componentes/encabezadoUsuario';
import Footer from "../../componentes/footer";
import Slider from '../../componentes/slider';
import CategoriasAtuendos from '../../componentes/categorias';
import UniformesDestacados from '../../componentes/vistaDeUniformesInicio';

export const inicioUsuario = () => {
  return (
    <div>
      <NavbarUsuario />
      <Slider />
      {/**<EncabezadoUser /> */}
      <CategoriasAtuendos />  
      <UniformesDestacados />
      <Footer />

    </div>
  )
}
