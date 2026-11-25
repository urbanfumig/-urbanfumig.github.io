const CACHE = 'uf-pitch-v13';
const ASSETS = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/logo-horizontal.png',
  './assets/icono-192.png',
  './assets/icono-512.png',
  './assets/cashea-uf.png',
  './assets/cashea-pildora.png',
  './assets/logo-certificado.png',
  './assets/certificado-real.jpg',
  './assets/hero-greysy.webp',
  './assets/poster-condominios.jpg',
  './assets/poster-fratello.jpg',
  './assets/poster-carros.jpg',
  './assets/poster-mariels.jpg',
  './assets/3d/alerta.png',
  './assets/3d/equipo.png',
  './assets/3d/escudo.png',
  './assets/3d/mapa.png',
  './assets/3d/certificado.png'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  if (e.request.url.endsWith('.mp4')) return;
  if (e.request.url.includes('/encuesta')) return;
  e.respondWith(
    caches.match(e.request).then((cached) => cached || fetch(e.request).catch(() => caches.match('./index.html')))
  );
});
