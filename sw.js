const CACHE_NAME = 'cgi-pos-v2';
const assets = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/amu-corn.jpg',
  '/images/thambapu-corn.jpg'
];

// Install Event
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      cache.addAll(assets);
    })
  );
});

// Activate Event
self.addEventListener('activate', evt => {
  evt.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys
        .filter(key => key !== CACHE_NAME)
        .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch Event - අන්තර්ජාලය නැතිවිට Cache එක ලබාදීම
self.addEventListener('fetch', evt => {
  evt.respondWith(
    fetch(evt.request).catch(() => caches.match(evt.request))
  );
});
