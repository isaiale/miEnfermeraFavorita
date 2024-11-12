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
    const storedUser = localStorage.getItem('user');
  
    if (storedUser) {
        const user = JSON.parse(storedUser);
        console.log('Usuario encontrado en localStorage:', user);
  
        if (user._id) {
            console.log(`El ID del usuario es: ${user._id}`);
            
            const vapidPublicKey = 'BG60RQWPyG2ENxTZGNN0A4gu4iBltktL8X5keD1Qp6d-laxrtViyba3WppAKI-nj1RJZOvvw3s71sNngCxjCSVo';
            const convertedVapidKey = urlBase64ToUint8Array(vapidPublicKey);
  
            return registration.pushManager.getSubscription()
                .then((subscription) => {
                    if (subscription) {
                        console.log('Suscripción existente encontrada:', subscription);
                        return sendSubscriptionToBackend(subscription, user._id);
                    } else {
                        return registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: convertedVapidKey
                        }).then((newSubscription) => {
                            console.log('Usuario suscrito a notificaciones push:', newSubscription);
                            return sendSubscriptionToBackend(newSubscription, user._id);
                        });
                    }
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
      userId
    };
  
    return fetch('https://back-end-enfermera.vercel.app/api/suscripciones/logeo', {
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
  