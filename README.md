# Mundial 2026 – Typer ⚽

Aplikacja do typowania wyników meczów Mistrzostw Świata 2026, działająca w całości
w przeglądarce (React + Babel ładowane z CDN, dane przechowywane w Firebase Realtime
Database). Nie wymaga żadnego budowania (`npm install`, `webpack` itp.) – to czysty
HTML/CSS/JS, więc można go opublikować bezpośrednio jako stronę statyczną.

## Co zmieniło się względem oryginalnego pliku

Oryginalny plik generował manifest PWA i Service Workera "w locie" za pomocą
`URL.createObjectURL(blob)`. To nie działa wiarygodnie po wystawieniu na GitHub
Pages (różne przeglądarki różnie traktują rejestrację Service Workera z `blob:`).
Dlatego:

- `index.html` – ten sam kod aplikacji, ale `<link rel="manifest">` i rejestracja
  Service Workera wskazują teraz na prawdziwe pliki.
- `manifest.json` – statyczny manifest PWA.
- `sw.js` – statyczny Service Worker (cache "network-first", działa offline).
- `icon.svg` – ikona aplikacji (favicon, ikona PWA, apple-touch-icon).
- `.nojekyll` – wyłącza przetwarzanie strony przez Jekyll na GitHub Pages
  (niepotrzebne, ale to standardowa dobra praktyka).

Logika samej aplikacji (komponenty React, obsługa typów, panel admina itd.) **nie
została zmieniona**.

## Wdrożenie na GitHub Pages

1. Stwórz nowe repozytorium na GitHub (np. `mundial2026`).
2. Wgraj do niego wszystkie pliki z tego folderu (`index.html`, `manifest.json`,
   `sw.js`, `icon.svg`, `.nojekyll`), zachowując strukturę katalogu głównego:

   ```
   git init
   git add .
   git commit -m "Mundial 2026 – pierwsza wersja"
   git branch -M main
   git remote add origin https://github.com/TWOJA-NAZWA/mundial2026.git
   git push -u origin main
   ```

3. W repozytorium na GitHub: **Settings → Pages → Build and deployment → Source**:
   wybierz `Deploy from a branch`, branch `main`, folder `/ (root)` → **Save**.
4. Po chwili strona będzie dostępna pod adresem:
   `https://TWOJA-NAZWA.github.io/mundial2026/`

Adres `start_url` w manifeście jest relatywny (`./index.html`), więc działa
poprawnie niezależnie od tego, czy strona stoi na głównej domenie, czy w
podkatalogu (jak właśnie na GitHub Pages).

## Ważne: bezpieczeństwo bazy Firebase

Klucz `apiKey` w `firebaseConfig` w kodzie **nie jest tajny** – to normalne dla
aplikacji webowych Firebase i nie trzeba go chować. Prawdziwe bezpieczeństwo
zapewniają **reguły bazy danych (Realtime Database Rules)** w konsoli Firebase.

Skoro strona będzie publicznie dostępna na GitHub Pages (czyli każdy może
zobaczyć adres `databaseURL`), warto przed publikacją zajrzeć do:
**Firebase Console → Realtime Database → Rules** i sprawdzić, czy ktoś
postronny nie mógłby nadpisać typów/wyników innych graczy. Jeśli panel admina
jest chroniony tylko hasłem w kodzie front-endowym, to samo w sobie nie blokuje
zapisu do bazy z zewnątrz – tę ochronę trzeba ustawić na poziomie reguł
Firebase, nie tylko w interfejsie aplikacji.

## Praca lokalna

Plik można otworzyć od razu w przeglądarce, ale Firebase i Service Worker
najlepiej testować przez lokalny serwer (zwykłe otwarcie przez `file://` bywa
ograniczone), np.:

```
npx serve .
```

i wejść na podany adres `http://localhost:...`.
