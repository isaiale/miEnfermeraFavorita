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

// ----------------------------
// Funcionalidad de Push Notifications
// ----------------------------

// Escuchar evento de Push
self.addEventListener('push', (event) => {
  const data = event.data.json(); // Parseamos los datos del mensaje

  const options = {
    body: data.body,
    icon: '/logo192.png', // Ícono de la notificación
    badge: '/logo192.png', // Badge de la notificación
    data: {
      url: data.url // Se puede incluir una URL para abrir al hacer clic en la notificación
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Manejar clic en la notificación
self.addEventListener('notificationclick', (event) => {
  event.notification.close(); // Cierra la notificación cuando el usuario hace clic

  // Navegar a la URL proporcionada si hay una
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
});
