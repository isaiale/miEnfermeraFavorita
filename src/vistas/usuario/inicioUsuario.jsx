import React, { useEffect, useContext } from 'react';
import { decodeToken } from "react-jwt"; // Asegúrate de tener instalada la librería jwt-decode
import NavbarUsuario from '../../componentes/navbarUsuario';
import Slider from '../../componentes/slider';
import CategoriasAtuendos from '../../componentes/categorias';
import UniformesDestacados from '../../componentes/vistaDeUniformesInicio';
import ComentariosClientes from '../../componentes/ComentariosClientes';
import ProductosCalzado from '../../componentes/productosCalzado';
import Footer from "../../componentes/footer";
import { AuthContext } from '../../autenticar/AuthProvider';

function InicioUsuario() {
  const { login } = useContext(AuthContext); // Obtenemos la función `login` del AuthContext

  useEffect(() => {    
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      try {        
        const decodedToken = decodeToken(token);
        login(decodedToken);
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (error) {
        console.error('Error al decodificar el token:', error);
      }
    } else {
      console.log('No se encontró un token en la URL');
    }
  }, [login]); // El array vacío hace que useEffect se ejecute solo una vez al montar el componente

  return (
    <div>
      <NavbarUsuario />
      <Slider />
      <CategoriasAtuendos />
      <ProductosCalzado />
      <UniformesDestacados />
      <ComentariosClientes />
      <Footer />
    </div>
  );
}

export default InicioUsuario;
