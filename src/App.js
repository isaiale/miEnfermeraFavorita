import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import InicioUsuario from './vistas/usuario/inicioUsuario';
import AvisoPrivacida from './vistas/usuario/avisoPrivacidad';
import ReservarA from './vistas/usuario/Reservar';
import { LoginUser } from './vistas/usuario/LoginUser';
import { Producto } from './vistas/usuario/productos';
import RegistroUser from './vistas/usuario/registroUser';
import CarritoCompra from './vistas/usuario/carritoDeCompras';
import PoliticaDeCookies from './vistas/usuario/politicaDeCookies';
import TerminosYCondiciones from './vistas/usuario/terminosYCondiciones';
import Error404 from './errores/error404';
import { Error_verificacion } from './errores/error_verificacion';
import Verificacion_correcta from './errores/verificacion_correcta';
import { Accesorioss } from './vistas/usuario/accesorios';
import { Contactos } from './vistas/usuario/contacto';
import RecuperarPasswordd from './vistas/usuario/RecuperarPassword';
import VistaBusquedaSimple from './vistas/usuario/VistaBusquedaSimple';
import VistaBusquedaAvanzada from './vistas/usuario/VistaBusquedaAvanzada';
import Prueba from './vistas/usuario/prueba';

import { InicioAdmin } from './vistas/administrador/InicioAdmin';

import InicioGerente from './vistas/gerente/InicioGerente';

import { AuthContextProvider } from './autenticar/AuthProvider';
import { Ayuda } from './vistas/usuario/ayuda';



export default function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<InicioUsuario />}></Route>
            <Route path="productos"  element={<Producto />}></Route>
            <Route path="login" element={<LoginUser/>}></Route>
            <Route path="registroUsuario"  element={<RegistroUser />}></Route>
            <Route path="carritoDeCompras"  element={<CarritoCompra />}></Route>
            <Route path="politicaDeCookies"  element={<PoliticaDeCookies />}></Route>
            <Route path="terminosYcondiciones" element={<TerminosYCondiciones />}></Route>                        
            <Route path="accesorioss" element={<Accesorioss />}></Route>
            <Route path="contacto" element={<Contactos />}></Route>
            <Route path="ayuda" element={<Ayuda/>}></Route>     
            <Route path="reservarA" element={<ReservarA />}></Route>            
            <Route path='avisoPrivacidad' element={<AvisoPrivacida />}></Route>
            <Route path='inicioAdmin' element={<InicioAdmin />}></Route>
            <Route path='inicioGerente' element={<InicioGerente/>}></Route>
            <Route path="recuperarPassword" element={<RecuperarPasswordd />}></Route>
            <Route path="busquedasimple" element={<VistaBusquedaSimple />}></Route>
            <Route path="busquedaAvanzada" element={<VistaBusquedaAvanzada />}></Route>
            <Route path="prueba" element={<Prueba />}></Route>
            
            <Route path="*" element={<Error404 />} /> 
            <Route path="error-verificacion" element={<Error_verificacion />} /> 
            <Route path="verificacion-correcta" element={<Verificacion_correcta />} />                                  
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>

    </div>
  );
}