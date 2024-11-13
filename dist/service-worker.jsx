self.addEventListener('push', (event) => {
  const data = event.data.json(); // Parseamos los datos del mensaje

  const options = {
    body: data.notification.body,
    icon: data.notification.icon || '/logo192.png', // Ícono de la notificación
    badge: data.notification.badge || '/logo192.png', // Badge de la notificación
    vibrate: data.notification.vibrate || [200, 50, 200], // Patrón de vibración
    sound: data.notification.sound, // URL del sonido
    actions: data.notification.actions || [], // Acciones que se pueden realizar desde la notificación
    data: {
      url: data.notification.actions?.[0]?.url || data.notification.data?.url // URL para abrir al hacer clic en la notificación
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.notification.title, options)
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
