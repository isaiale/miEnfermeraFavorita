import React from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import { inicioUsuario } from './vistas/inicioUsuario';
import { avisoPrivacidad } from './vistas/avisoPrivacidad';
import desarrolladores from './vistas/desarrolladores';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path='/' Component={inicioUsuario}></Route>
            <Route path='avisoPrivacidad' Component={avisoPrivacidad}></Route>
            <Route path='desarrolladores' Component={desarrolladores}></Route>
          </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;