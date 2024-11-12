import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { AuthContextProvider } from './autenticar/AuthProvider';
import { askPermission, subscribeUserToPush } from './utilidad/pushNotifications'; // Importa las funciones de notificaciones push

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
);

// Registrar el service worker manualmente y configurar notificaciones push
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado con éxito:', registration);

        // Pedir permiso para las notificaciones push
        askPermission().then((permission) => {
          if (permission === 'granted') {
            // Suscribir al usuario a las notificaciones push
            subscribeUserToPush(registration);
          } else {
            console.log('Permiso de notificación no concedido');
          }
        });
      })
      .catch((error) => {
        console.log('Error al registrar el Service Worker:', error);
      });
  });
}


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// // import reportWebVitals from './reportWebVitals';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'bootstrap/dist/js/bootstrap.bundle';
// import { AuthContextProvider } from './autenticar/AuthProvider';
// // import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Importar el service worker

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <AuthContextProvider>
//       <App />
//     </AuthContextProvider>
//   </React.StrictMode>
// );

// // Registrar el service worker manualmente
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/service-worker.js')
//       .then((registration) => {
//         console.log('Service Worker registrado con éxito:', registration);
//       })
//       .catch((error) => {
//         console.log('Error al registrar el Service Worker:', error);
//       });
//   });
// }

// // serviceWorkerRegistration.register();

// // reportWebVitals();
// // reportWebVitals(console.log);
