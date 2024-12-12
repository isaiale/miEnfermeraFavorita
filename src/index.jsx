import * as Sentry from "@sentry/react";
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { AuthContextProvider } from './autenticar/AuthProvider';
import { askPermission, subscribeUserToPush } from './utilidad/pushNotifications';
import SplashScreen from './SplashScreen';
import reportWebVitals from "./reportWebVitals";

// Aquí, las métricas se capturan y se envían al servicio de análisis (o se imprimen en consola)
reportWebVitals();

Sentry.init({
  dsn: "https://6df713072cb39720ea91f0f8895dfbbc@o4508372929609728.ingest.us.sentry.io/4508372934983680",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

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