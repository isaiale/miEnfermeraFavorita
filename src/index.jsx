import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { AuthContextProvider } from './autenticar/AuthProvider';
import { askPermission, subscribeUserToPush } from './utilidad/pushNotifications';
import SplashScreen from './SplashScreen';

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
const Root = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Ocultar el splash después de 1 segundo
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <React.StrictMode>
      {showSplash ? (
        <SplashScreen /> // Mostrar SplashScreen
      ) : (
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      )}
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);