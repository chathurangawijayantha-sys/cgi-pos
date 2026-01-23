// Service Worker for CGI POS
self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request));
});