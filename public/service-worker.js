const CACHE_NAME = 'mi-enfermera-favorita-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/logo_transparent.png',  
  '/manifest.json',
  // Agrega aquí otros archivos que quieras cachear, como CSS o JS
];

// Instalación del Service Worker y cacheo de archivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Archivos cacheados');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker y eliminación de caches antiguos
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Cache viejo eliminado:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Intercepta las solicitudes de la red y devuelve los recursos del cache
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Devuelve la respuesta cacheada si existe, de lo contrario hace la petición normal
        return response || fetch(event.request);
      })
  );
});












// const CACHE_NAME = 'my-app-cache-v1';
// const urlsToCache = [
//   '/',
//   '/index.html',
//   '/static/js/bundle.js',
//   '/static/js/0.chunk.js',
//   '/static/js/main.chunk.js',
//   '/static/css/main.chunk.css'
// ];

// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => {
//         console.log('Opened cache');
//         return cache.addAll(urlsToCache);
//       })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request)
//       .then((response) => {
//         if (response) {
//           return response;
//         }
//         return fetch(event.request);
//       }
//     )
//   );
// });

// self.addEventListener('activate', (event) => {
//   const cacheWhitelist = [CACHE_NAME];
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheWhitelist.indexOf(cacheName) === -1) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener('push', (event) => {
//   const data = event.data.json();
//   const options = {
//     body: data.body,
//     icon: data.icon,
//     badge: data.badge,
//   };

//   event.waitUntil(
//     self.registration.showNotification(data.title, options)
//   );
// });