import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { AuthContextProvider } from './autenticar/AuthProvider';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Importar el service worker

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);

// Registrar el service worker para que la aplicación funcione sin conexión y se cargue más rápido
serviceWorkerRegistration.register();

reportWebVitals();
// reportWebVitals(console.log);
