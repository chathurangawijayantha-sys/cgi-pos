const CACHE_NAME = 'cgi-pos-v3';
const assets = [
  './',
  './index.html',
  './admin.html',
  './manifest.json',
  './images/amu-corn.jpg',
  './images/thambapu-corn.jpg',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

// Install Event - අවශ්‍ය සියලුම ගොනු බ්‍රවුසරයේ සේව් කර ගැනීම
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching shell assets');
      cache.addAll(assets);
    })
  );
});

// Activate Event - පරණ Cache මකා දමා අලුත් එක සක්‍රීය කිරීම
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

// Fetch Event - ඉන්ටර්නෙට් නැති විට Cache එකෙන් දත්ත ලබා දීම
self.addEventListener('fetch', evt => {
  // Firebase දත්ත ලබා ගන්නා Request වලට Cache භාවිතා නොකරයි (එය Firebase SDK එකෙන් බලාගනී)
  if (evt.request.url.indexOf('firebaseio.com') === -1) {
    evt.respondWith(
      fetch(evt.request).catch(() => {
        return caches.match(evt.request);
      })
    );
  }
});const CACHE_NAME = 'cgi-pos-v3';
const assets = [
  './',
  './index.html',
  './admin.html',
  './manifest.json',
  './images/amu-corn.jpg',
  './images/thambapu-corn.jpg',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

// Install Event - අවශ්‍ය සියලුම ගොනු බ්‍රවුසරයේ සේව් කර ගැනීම
self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching shell assets');
      cache.addAll(assets);
    })
  );
});

// Activate Event - පරණ Cache මකා දමා අලුත් එක සක්‍රීය කිරීම
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

// Fetch Event - ඉන්ටර්නෙට් නැති විට Cache එකෙන් දත්ත ලබා දීම
self.addEventListener('fetch', evt => {
  // Firebase දත්ත ලබා ගන්නා Request වලට Cache භාවිතා නොකරයි (එය Firebase SDK එකෙන් බලාගනී)
  if (evt.request.url.indexOf('firebaseio.com') === -1) {
    evt.respondWith(
      fetch(evt.request).catch(() => {
        return caches.match(evt.request);
      })
    );
  }
});
