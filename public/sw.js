// Service Worker for NoNim PWA
const CACHE_NAME = 'nonim-v2.0.0';
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

// Assets to cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/responsive.css',
  '/js/utils.js',
  '/js/api.js',
  '/js/components.js',
  '/js/router.js',
  '/js/app.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
  'asset/favicon.png',
  'asset/nav_icon.png',
  'asset/loading.png'
];

// Install event - cache assets
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching app shell');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', event => {
  // Skip cross-origin requests and non-GET requests
  if (!event.request.url.startsWith(self.location.origin) || 
      event.request.method !== 'GET') {
    return;
  }

  // Special handling for API calls - network only
  if (event.request.url.includes('/api/') || 
      event.request.url.includes('.mp4') || 
      event.request.url.includes('.m3u8')) {
    return;
  }

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Clone the response
        const responseClone = response.clone();
        
        // Cache the successful responses
        if (response.status === 200) {
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseClone);
            });
        }
        
        return response;
      })
      .catch(() => {
        // Fallback to cache
        return caches.match(event.request)
          .then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }
            
            // Fallback for offline page
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            
            return new Response('Offline', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

// Background sync for failed requests
self.addEventListener('sync', event => {
  if (event.tag === 'sync-favorites') {
    event.waitUntil(syncFavorites());
  }
});

// Push notification
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'NoNim - Update tersedia!',
    icon: 'asset/icons/icon-192x192.png',
    badge: 'asset/icons/icon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: 'asset/icons/explore.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: 'asset/icons/close.svg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('NoNim', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  console.log('[Service Worker] Notification click received.');
  
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' })
      .then(clientList => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
  );
});

// Periodic sync for updates
self.addEventListener('periodicsync', event => {
  if (event.tag === 'update-content') {
    event.waitUntil(updateContent());
  }
});

// Helper function to sync favorites
function syncFavorites() {
  return new Promise((resolve, reject) => {
    // Implement your sync logic here
    console.log('[Service Worker] Syncing favorites...');
    resolve();
  });
}

// Helper function to update content
function updateContent() {
  return new Promise((resolve, reject) => {
    console.log('[Service Worker] Updating content...');
    resolve();
  });
}

// Clean up old cache entries
function cleanupOldCache() {
  setInterval(() => {
    caches.open(CACHE_NAME).then(cache => {
      cache.keys().then(requests => {
        requests.forEach(request => {
          cache.match(request).then(response => {
            if (response) {
              const cachedDate = new Date(response.headers.get('date'));
              const now = new Date();
              const age = now - cachedDate;
              
              if (age > CACHE_DURATION) {
                cache.delete(request);
              }
            }
          });
        });
      });
    });
  }, 60 * 60 * 1000); // Check every hour
}

// Start cleanup on activation
self.addEventListener('activate', event => {
  event.waitUntil(cleanupOldCache());
});