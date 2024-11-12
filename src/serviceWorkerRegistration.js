// const isLocalhost = Boolean(
//   window.location.hostname === 'localhost' ||
//   window.location.hostname === '[::1]' ||
//   window.location.hostname.match(
//     /^127(?:\.(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])){3}$/
//   )
// );

// export function register(config) {
//   if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
//     const publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);
//     if (publicUrl.origin !== window.location.origin) {
//       return;
//     }

//     window.addEventListener('load', () => {
//       const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

//       if (isLocalhost) {
//         checkValidServiceWorker(swUrl, config);

//         navigator.serviceWorker.ready.then(() => {
//           console.log(
//             'Esta aplicación está siendo servida por un service worker.'
//           );
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     });
//   }
// }

// function registerValidSW(swUrl, config) {
//   navigator.serviceWorker
//     .register(swUrl)
//     .then((registration) => {
//       console.log('Service Worker registrado correctamente:', registration);

//       // Pregunta al usuario si desea recibir notificaciones push
//       askPermission().then((permissionResult) => {
//         if (permissionResult === 'granted') {
//           console.log('Permiso concedido para notificaciones');
//           subscribeUserToPush(registration); // Suscribir al usuario
//         } else {
//           console.log('Permiso denegado para notificaciones');
//         }
//       });

//       registration.onupdatefound = () => {
//         const installingWorker = registration.installing;
//         if (installingWorker == null) {
//           return;
//         }
//         installingWorker.onstatechange = () => {
//           if (installingWorker.state === 'installed') {
//             if (navigator.serviceWorker.controller) {
//               console.log(
//                 'Nuevo contenido está disponible y se utilizará cuando todas las pestañas de esta página se cierren.'
//               );
//               if (config && config.onUpdate) {
//                 config.onUpdate(registration);
//               }
//             } else {
//               console.log('El contenido está cacheado para uso offline.');
//               if (config && config.onSuccess) {
//                 config.onSuccess(registration);
//               }
//             }
//           }
//         };
//       };
//     })
//     .catch((error) => {
//       console.error('Error durante la instalación del Service Worker:', error);
//     });
// }

// function checkValidServiceWorker(swUrl, config) {
//   fetch(swUrl, { headers: { 'service-worker': 'script' } })
//     .then((response) => {
//       const contentType = response.headers.get('content-type');
//       if (
//         response.status === 404 ||
//         (contentType != null && contentType.indexOf('javascript') === -1)
//       ) {
//         navigator.serviceWorker.ready.then((registration) => {
//           registration.unregister().then(() => {
//             window.location.reload();
//           });
//         });
//       } else {
//         registerValidSW(swUrl, config);
//       }
//     })
//     .catch(() => {
//       console.log(
//         'No se encontró conexión a Internet. La aplicación está funcionando en modo offline.'
//       );
//     });
// }

// export function unregister() {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.ready
//       .then((registration) => {
//         registration.unregister();
//       })
//       .catch((error) => {
//         console.error(error.message);
//       });
//   }
// }