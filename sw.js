// Service Worker dla Mundial 2026 — podstawowe cache'owanie (network-first).
// Wersję CACHE zwiększ przy każdej większej zmianie, aby wymusić odświeżenie cache u userów.
const CACHE = 'mundial2026-v2';
const OFFLINE_URLS = [
  './',
  './index.html',
  './manifest.json',
  './icon.svg'
];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(OFFLINE_URLS)).catch(() => {})
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        // odśwież cache świeżą odpowiedzią (best-effort)
        const resClone = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, resClone)).catch(() => {});
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
