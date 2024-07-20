// src/serviceWorkerRegistration.js

// Este archivo solo existe para una experiencia de desarrollo más fácil en Create React App. 
// Consulte https://cra.link/PWA para obtener más información.
const isLocalhost = Boolean(
    window.location.hostname === 'localhost' ||
      // [::1] es la dirección de localhost en IPv6.
      window.location.hostname === '[::1]' ||
      // 127.0.0.0/8 son consideradas localhost en IPv4.
      window.location.hostname.match(
        /^127(?:\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}$/
      )
  );
  
  export function register(config) {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      // El constructor de URL está disponible en todos los navegadores que soportan SW.
      const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
      if (publicUrl.origin !== window.location.origin) {
        // Nuestro service worker no funcionará si PUBLIC_URL está en una URL diferente.
        // Esto puede ocurrir si se usa un CDN para servir recursos; ver más en https://github.com/facebook/create-react-app/issues/2374
        return;
      }
  
      window.addEventListener('load', () => {
        const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;
  
        if (isLocalhost) {
          // Esto es para verificar si el service worker se puede encontrar. Si no, recarga la página.
          checkValidServiceWorker(swUrl, config);
  
          // Añadir alguna lógica adicional para servir al localhost.
          navigator.serviceWorker.ready.then(() => {
            console.log(
              'Esta aplicación está siendo servida en caché por un service worker.'
            );
          });
        } else {
          // No es localhost. Solo registra el service worker.
          registerValidSW(swUrl, config);
        }
      });
    }
  }
  
  function registerValidSW(swUrl, config) {
    navigator.serviceWorker
      .register(swUrl)
      .then(registration => {
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // En este punto, el contenido antiguo ha sido reemplazado por el nuevo.
                console.log(
                  'Nuevo contenido está disponible; por favor recargue la página.'
                );
  
                // Ejecutar callback si existe.
                if (config && config.onUpdate) {
                  config.onUpdate(registration);
                }
              } else {
                // En este punto, todo está en caché.
                console.log('Contenido está en caché para usar sin conexión.');
  
                // Ejecutar callback si existe.
                if (config && config.onSuccess) {
                  config.onSuccess(registration);
                }
              }
            }
          };
        };
      })
      .catch(error => {
        console.error('Error durante el registro del service worker:', error);
      });
  }
  
  function checkValidServiceWorker(swUrl, config) {
    // Comprobar si el service worker aún existe.
    fetch(swUrl, {
      headers: { 'Service-Worker': 'script' },
    })
      .then(response => {
        // Asegurarse de que el service worker existe, y que realmente estamos obteniendo un archivo JS.
        const contentType = response.headers.get('content-type');
        if (
          response.status === 404 ||
          (contentType != null && contentType.indexOf('javascript') === -1)
        ) {
          // No se encontró ningún service worker. Probablemente un archivo antiguo de desarrollo. Navegar a la URL base.
          navigator.serviceWorker.ready.then(registration => {
            registration.unregister().then(() => {
              window.location.reload();
            });
          });
        } else {
          // Service worker encontrado. Proceder normalmente.
          registerValidSW(swUrl, config);
        }
      })
      .catch(() => {
        console.log(
          'No se puede conectar al service worker. La aplicación estará disponible sin conexión una vez esté en línea.'
        );
      });
  }
  
  export function unregister() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready
        .then(registration => {
          registration.unregister();
        })
        .catch(error => {
          console.error(error.message);
        });
    }
  }
  