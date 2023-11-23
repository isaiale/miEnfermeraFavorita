import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { inicioUsuario } from './vistas/usuario/inicioUsuario';
import { avisoPrivacidad } from './vistas/usuario/avisoPrivacidad';
import desarrolladores from './vistas/usuario/desarrolladores';
import { navegacionCifrado } from './vistas/usuario/navegacionCifrado';
import ReservarA from './vistas/usuario/Reservar';

import EscitalaCifrado from './componentes/cifradoEscitalo';
import CifradoCesar from './componentes/encriptacionCesar';

import { Producto } from './vistas/usuario/productos';
import login from './vistas/usuario/login';
import registroUser from './vistas/usuario/registroUser';
import CarritoCompra from './vistas/usuario/carritoDeCompras';
import PoliticaDeCookies from './vistas/usuario/politicaDeCookies';
import TerminosYCondiciones from './vistas/usuario/terminosYCondiciones';
import Error404 from './componentes/error404';
import { Accesorioss } from './vistas/usuario/accesorios';
import { Contactos } from './vistas/usuario/contacto';

import { AuthContextProvider } from './autenticar/AuthProvider';


function App() {
  return (
    <div>
      <AuthContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' Component={inicioUsuario}></Route>
            <Route path="productos" Component={Producto}></Route>
            <Route path="login" Component={login}></Route>
            <Route path="registroUsuario" Component={registroUser}></Route>
            <Route path="carritoDeCompras" Component={CarritoCompra}></Route>
            <Route path="politicaDeCookies" Component={PoliticaDeCookies}></Route>
            <Route path="terminosYcondiciones" Component={TerminosYCondiciones}></Route>                        
            <Route path="accesorioss" Component={Accesorioss}></Route>
            <Route path="contacto" Component={Contactos}></Route>   
            <Route path="reservarA" Component={ReservarA}></Route>            

            <Route path='avisoPrivacidad' Component={avisoPrivacidad}></Route>
            <Route path='desarrolladores' Component={desarrolladores}></Route>
            <Route path='navegacionCifrados' Component={navegacionCifrado}></Route>

            <Route path='escitala' Component={EscitalaCifrado}></Route>
            <Route path='cesar' Component={CifradoCesar}></Route>
            <Route path="*" element={<Error404 />} />
          </Routes>
        </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;