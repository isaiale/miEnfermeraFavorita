// public/js/service-worker.js

self.addEventListener('push', function(event) {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const title = data.notification.title || 'Sin título';
  const options = {
    body: data.notification.body || 'Sin cuerpo',
    icon: data.notification.icon || 'https://mi-enfermera-favorita.vercel.app/static/media/Logo%20de%20mi%20enfermera%20favorita.63ec5381f06c2c8431ee.jpg',
    vibrate: data.notification.vibrate || [200, 50, 200],
    actions: data.notification.actions || []
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then(windowClients => {
      for (let i = 0; i < windowClients.length; i++) {
        const client = windowClients[i];
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data.url);
      }
    })
  );
});
