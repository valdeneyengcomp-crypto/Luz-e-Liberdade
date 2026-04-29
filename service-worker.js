const CACHE_NAME = 'luz-e-liberdade-v1';
const ASSETS_TO_CACHE = [
    './index.html',
    './biblioteca.html',
    './acervo.html',
    './css/styles.css',
    './js/media.js',
    './js/meetings.js',
    './js/members.js',
    'https://lh3.googleusercontent.com/d/1CyAHbjIMnVZj5ZPHOiWjFVAnV4uyLlNc'
];

// Instalação e Cache inicial dos arquivos
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
});

// Estratégia de Fetch: Tenta o cache primeiro, senão vai para a rede
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});