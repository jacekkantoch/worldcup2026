/* Service worker — FIFA WORLD CUP 2026 Typer
 * Strategia:
 *  - Nawigacja (HTML) i zasoby statyczne (JS/CSS/fonty/ikony z CDN): stale-while-revalidate.
 *    Apka startuje natychmiast z cache, a w tle pobiera świeższą wersję na następny raz.
 *  - Firebase Realtime Database: ZAWSZE z sieci, NIGDY z cache (wyniki muszą być aktualne).
 *
 *  Aby wymusić odświeżenie cache po aktualizacji aplikacji — podnieś numer wersji poniżej.
 */
const CACHE = 'mundial2026-v1';

// Domeny/fragmenty, których NIGDY nie cache'ujemy (dane na żywo).
const NEVER_CACHE = [
  'firebasedatabase.app',
  'firebaseio.com',
  'google-analytics.com',
  'googletagmanager.com',
];

// Zasoby warte wstępnego zapisania przy instalacji (reszta dojdzie w locie).
const PRECACHE = [
  './',
  './index.html',
  './mundial2026-app-icon-v2-32.png',
  './mundial2026-app-icon-v2-180.png',
  './mundial2026-app-icon-v2-192.png',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(PRECACHE).catch(() => {})) // brak ikony nie blokuje instalacji
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k.startsWith('mundial2026-') && k !== CACHE)
            .map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Tylko GET. POST/PUT (zapisy do bazy) zawsze idą do sieci nietknięte.
  if (req.method !== 'GET') return;

  const url = new URL(req.url);

  // Dane na żywo — pomijamy SW całkowicie (przeglądarka pobiera normalnie z sieci).
  if (NEVER_CACHE.some((host) => url.hostname.includes(host))) return;

  // Nawigacja (wpisanie adresu, odświeżenie, start z ekranu głównego):
  // sieć → przy braku łącza fallback do zapisanego index.html.
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('./index.html', copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match('./index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  // Pozostałe zasoby statyczne: stale-while-revalidate.
  event.respondWith(
    caches.match(req).then((cached) => {
      const network = fetch(req)
        .then((res) => {
          // Cache'ujemy tylko poprawne odpowiedzi (status 200, typy basic/cors).
          if (res && res.status === 200 && (res.type === 'basic' || res.type === 'cors')) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          }
          return res;
        })
        .catch(() => cached); // offline → oddaj to, co mamy
      return cached || network;
    })
  );
});
