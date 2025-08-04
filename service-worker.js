const CACHE_NAME = 'calcule-sua-saude-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/css/estilo.css',
    '/quiz_styles.css',
    '/js/modo-noturno.js',
    '/js/quiz.js',
    '/js/desafios.js',
    '/manifest.json',
    '/icon192.png',
    '/favicon.ico',
    '/jogos.html',
    '/jogos/alimentacao_saudavel.html',
    '/jogos/adivinhe_caloria.html',
    '/jogos/rotina_saudavel.html',
    '/jogos/memoria_saude.html',
    '/jogos/desafio_rotina.html',
    '/desafios.html',
    '/todos_quizzes.html',
    '/artigos.html',
    '/sobre.html',
    '/contato.html',
    '/politica.html',
    '/termos.html',
    '/ferramentas/imc.html',
    '/ferramentas/tmb.html',
    '/ferramentas/agua.html',
    '/ferramentas/gordura.html',
    '/ferramentas/macros.html',
    '/ferramentas/glicemia.html',
    '/ferramentas/calorias.html',
    '/ferramentas/imc_infantil.html',
    '/ferramentas/frequencia_cardiaca.html',
    '/ferramentas/agua_corporal.html',
    '/quiz.html',
    '/quiz_treino.html',
    '/quiz_alimentacao.html',
    '/img/artigos/metabolismo.jpg',
    '/img/artigos/hidratacao.jpg',
    '/img/artigos/imc.jpg'
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request);
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


