const CACHE_NAME = 'gami-pos-v' + Date.now(); // සෑම විටම අලුත් වර්ෂන් එකක් සාදයි

self.addEventListener('install', (event) => {
    // අලුත් වෙනස්කම් තිබේ නම් පරණ ඒවා මතින් වහාම ක්‍රියාත්මක වීමට බල කරයි
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    // පරණ Cache සියල්ල මකා දමයි
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    return caches.delete(cacheName);
                })
            );
        }).then(() => {
            // වහාම ඇප් එකේ පාලනය අතට ගනී
            return self.clients.claim();
        })
    );
});

self.addEventListener('fetch', (event) => {
    // ජාලය (Network) හරහා දත්ත ලබා ගැනීමට උත්සාහ කරයි, නැතිනම් පමණක් Cache පරීක්ෂා කරයි
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
