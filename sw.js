const CACHE_NAME = 'arepas-v1';

self.addEventListener('install', e => {
    self.skipWaiting();
});

self.addEventListener('activate', e => {
    e.waitUntil(clients.claim());
});

// Manejar notificaciones push
self.addEventListener('push', e => {
    if (!e.data) return;
    const data = e.data.json();
    e.waitUntil(
        self.registration.showNotification(data.title || 'Arepas al Carbón', {
            body: data.body || '',
            icon: '/Arepas.png',
            badge: '/Arepas.png',
            vibrate: [200, 100, 200],
            data: data.url || '/',
            actions: data.actions || []
        })
    );
});

// Al hacer clic en la notificación
self.addEventListener('notificationclick', e => {
    e.notification.close();
    e.waitUntil(
        clients.matchAll({ type: 'window' }).then(clientList => {
            for (const client of clientList) {
                if (client.url === '/' && 'focus' in client) return client.focus();
            }
            if (clients.openWindow) return clients.openWindow('/');
        })
    );
});
