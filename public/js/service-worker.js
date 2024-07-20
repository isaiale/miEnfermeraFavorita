self.addEventListener('push', function(event) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: 'logo_transparent.png',
      badge: 'logo_transparent.png'
    };
  
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  });
  