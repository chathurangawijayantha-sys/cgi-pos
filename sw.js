// Service Worker for CGI POS
const CACHE_NAME = 'gami-pos-v2';
const ASSETS = [
  './',
  './index.html',
  './admin.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

// Install Event - ගොනු Cache කිරීම
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets...');
      return cache.addAll(ASSETS);
    })
  );
});

// Fetch Event - Offline ඇති විට මතකයෙන් ලබා දීම
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // මතකයේ (Cache) ඇත්නම් එය ලබා දෙයි, නැතිනම් Network එකෙන් ගනී
      return response || fetch(event.request);
    }).catch(() => {
      // සම්පූර්ණයෙන්ම Offline නම් index.html පෙන්වයි
      return caches.match('./index.html');
    })
  );
});

// පැරණි Cache ඉවත් කිරීම (Activate Event)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      );
    })
  );
});
