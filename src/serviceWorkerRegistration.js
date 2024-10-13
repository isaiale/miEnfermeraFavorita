const isLocalhost = Boolean(
  window.location.hostname === 'localhost' ||
  window.location.hostname === '[::1]' ||
  window.location.hostname.match(
    /^127(?:\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}$/
  )
);

export function register(config) {
  if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
    const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
    if (publicUrl.origin !== window.location.origin) {
      return;
    }

    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      if (isLocalhost) {
        checkValidServiceWorker(swUrl, config);

        navigator.serviceWorker.ready.then(() => {
          console.log(
            'Esta aplicación está siendo servida por un service worker.'
          );
        });
      } else {
        registerValidSW(swUrl, config);
      }
    });
  }
}

function registerValidSW(swUrl, config) {
  navigator.serviceWorker
    .register(swUrl)
    .then((registration) => {
      console.log('Service Worker registrado correctamente:', registration);

      // Pregunta al usuario si desea recibir notificaciones push
      askPermission().then((permissionResult) => {
        if (permissionResult === 'granted') {
          console.log('Permiso concedido para notificaciones');
          // subscribeUserToPush(registration); // Suscribir al usuario
        } else {
          console.log('Permiso denegado para notificaciones');
        }
      });

      registration.onupdatefound = () => {
        const installingWorker = registration.installing;
        if (installingWorker == null) {
          return;
        }
        installingWorker.onstatechange = () => {
          if (installingWorker.state === 'installed') {
            if (navigator.serviceWorker.controller) {
              console.log(
                'Nuevo contenido está disponible y se utilizará cuando todas las pestañas de esta página se cierren.'
              );
              if (config && config.onUpdate) {
                config.onUpdate(registration);
              }
            } else {
              console.log('El contenido está cacheado para uso offline.');
              if (config && config.onSuccess) {
                config.onSuccess(registration);
              }
            }
          }
        };
      };
    })
    .catch((error) => {
      console.error('Error durante la instalación del Service Worker:', error);
    });
}

function checkValidServiceWorker(swUrl, config) {
  fetch(swUrl, { headers: { 'Service-Worker': 'script' } })
    .then((response) => {
      const contentType = response.headers.get('content-type');
      if (
        response.status === 404 ||
        (contentType != null && contentType.indexOf('javascript') === -1)
      ) {
        navigator.serviceWorker.ready.then((registration) => {
          registration.unregister().then(() => {
            window.location.reload();
          });
        });
      } else {
        registerValidSW(swUrl, config);
      }
    })
    .catch(() => {
      console.log(
        'No se encontró conexión a Internet. La aplicación está funcionando en modo offline.'
      );
    });
}

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready
      .then((registration) => {
        registration.unregister();
      })
      .catch((error) => {
        console.error(error.message);
      });
  }
}

// ------------------------------------
// Funciones adicionales para notificaciones push
// ------------------------------------

export function askPermission() {
  return new Promise((resolve, reject) => {
    const permissionResult = Notification.requestPermission((result) => {
      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  });
}

export function subscribeUserToPush(registration) {
  // Verifica si el usuario está en el localStorage
  const storedUser = localStorage.getItem('user');
  
  if (storedUser) {
    const user = JSON.parse(storedUser);
    console.log('Usuario encontrado en localStorage:', user);

    if (user.id) {
      console.log(`El ID del usuario es: ${user._id}`);
      
      const vapidPublicKey = 'BG60RQWPyG2ENxTZGNN0A4gu4iBltktL8X5keD1Qp6d-laxrtViyba3WppAKI-nj1RJZOvvw3s71sNngCxjCSVo'; // Reemplazar con la clave pública VAPID real
      const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);

      return registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: convertedVapidKey
        })
        .then((subscription) => {
          console.log('Usuario suscrito a notificaciones push:', subscription);
          // Envía la suscripción junto con el userId al backend
          return sendSubscriptionToBackend(subscription, user.id);
        })
        .catch((err) => {
          console.error('Error al suscribir al usuario a notificaciones push:', err);
        });
    } else {
      console.log('El ID del usuario no está disponible en localStorage.');
      return;
    }
  } else {
    console.log('No se encontró ningún usuario en el localStorage.');
    return;
  }
}

// Convierte base64 a Uint8Array
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Enviar la suscripción al backend junto con el userId
function sendSubscriptionToBackend(subscription, userId) {
  const payload = {
    subscription,
    userId  // Envía el ID del usuario junto con la suscripción
  };

  return fetch('/api/subscribe', {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error al guardar la suscripción en el servidor.');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Suscripción guardada en el servidor:', data);
    })
    .catch((err) => {
      console.error('Error al enviar la suscripción al servidor:', err);
    });
}
