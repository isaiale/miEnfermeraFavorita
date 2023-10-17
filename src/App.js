import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { inicioUsuario } from './vistas/inicioUsuario';
import { avisoPrivacidad } from './vistas/avisoPrivacidad';
import desarrolladores from './vistas/desarrolladores';
import { navegacionCifrado } from './vistas/navegacionCifrado';

import EscitalaCifrado from './componentes/cifradoEscitalo';
import CifradoCesar from './componentes/encriptacionCesar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={inicioUsuario}></Route>
          <Route path='avisoPrivacidad' Component={avisoPrivacidad}></Route>
          <Route path='desarrolladores' Component={desarrolladores}></Route>
          <Route path='navegacionCifrados' Component={navegacionCifrado}></Route>

          <Route path='escitala' Component={EscitalaCifrado}></Route>
          <Route path='cesar' Component={CifradoCesar}></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;